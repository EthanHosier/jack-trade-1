import { Award, CandlestickChart, DollarSign } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from "./data-table/data-table"

import { Trade, columns } from "./data-table/columns";
import { useEffect, useState } from "react"
import { collection, doc, onSnapshot } from "firebase/firestore"
import { db } from "./firebase/config"
import AddTradeButton from "./components/trades/AddTradeButton"
import EditDataButton from "./components/trades/EditDataButton";
import { to2dp } from "./lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import NeedlePieChart from "./components/trades/NeedlePieChart";
import { MARKETS } from "./lib/constants";
import ResetProfitLossButton from "./components/trades/ResetProfitLossButton";
import ModeToggle from "./components/ModeToggle";
import { useTheme } from "./components/theme-provider";

const needleDark = "#dddddd";
const needleLight = "#000000";

const DATA1 = [
  { name: 'A', value: 25, color: '#eeeeee' }, // White
  { name: 'B', value: 25, color: '#cccccc' }, // Light Gray
  { name: 'C', value: 25, color: '#999999' }, // Medium Gray
  { name: 'D', value: 25, color: '#666666' }, // Dark Gray
];

const DATA2 = [
  { name: 'A', value: 25, color: '#FF0000' }, 
  { name: 'B', value: 25, color: '#FF8000' }, 
  { name: 'C', value: 25, color: '#80FF00' }, 
  { name: 'D', value: 25, color: '#00FF00' }, 
];

const DATA1Dark = [
  { name: 'A', value: 25, color: '#333333' }, // Dark Gray (Text)
  { name: 'B', value: 25, color: '#555555' }, // Gray
  { name: 'C', value: 25, color: '#777777' }, // Light Gray
  { name: 'D', value: 25, color: '#999999' }, // Lighter Gray
];

const DATA2Dark = [
  { name: 'A', value: 25, color: '#CC0000' }, // Dark Red
  { name: 'B', value: 25, color: '#FF6600' }, // Dark Orange
  { name: 'C', value: 25, color: '#66CC00' }, // Dark Yellowish Green
  { name: 'D', value: 25, color: '#009900' }, // Dark Green
];

export interface Data {
  currentBalance: number,
  target: number,
  maxRiskPerTrade: number,
  profitLoss: number,
  wins: number,
  losses: number,
  priceAccumulator: number,
  percentDailyRisk: number,
}

function App() {
  const {theme} = useTheme();

  const [data, setData] = useState<Data | null>(null);
  const [trades, setTrades] = useState<Trade[] | null>(null);

  const [allocatedRisk, setAllocatedRisk] = useState<number | null>(null);

  useEffect(() => {
    //data
    const unsubData = onSnapshot(doc(db, "data", "1"), ((doc: any) => {
      setData(doc.data());
    }))

    //trades
    const unsubTrades = onSnapshot(collection(db, "trades"), snapshot => {
      const trades: Trade[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();

        const foundExchangeObj = MARKETS.find(m => m.name === data.market)

        const trade: Trade = {
          id: doc.id,
          exchange: foundExchangeObj?.exchange ?? "",
          market: data.market,
          stopSize: data.stopSize,
          risk: 0,
          tradeStatus: data.position ? "Live" : "Awaiting Fill",
          position: data.position ?? "",
          plusMinus: 0,
        }

        trades.push(trade);
      })

      setTrades(trades);
    })

    return () => {
      unsubData();
      unsubTrades();
    }
  }, [])

  useEffect(() => {
    if (!trades) return;

    const ar = trades.reduce((acc, trade: Trade) => {
      const foundMarket = MARKETS.find(m => m.name === trade.market);

      if (!foundMarket || !trade.position) return acc;


      return acc + +trade.position * foundMarket.tick;
    }
      , 0);

    setAllocatedRisk(ar);
  }, [trades])

  return (
    <Card className="min-h-full m-4 p-4 xl:p-8 max-w-[1200px] lg:mx-auto">

      <div className="flex justify-between">
        <div className="mr-4">
          <h1 className="text-xl font-semibold">Trade Tracker</h1>

          <div className="flex items-center mt-4 gap-4">

            <AddTradeButton />
            <EditDataButton data={data} />
            <ModeToggle/>

          </div>
        </div>

        <div className="flex flex-1 gap-4 justify-end">
          <Card className="flex-1 max-w-[300px]">
            <CardHeader>
              <CardTitle className='text-sm font-normal'>
                <div className='flex justify-between items-center'>
                  <p className="text-primary/70">Total Balance</p>
                  <DollarSign size={16} className="text-primary/70"/>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {
                data ?
                  <p className='text-2xl -mt-5 font-semibold text-primary'>${to2dp(data?.currentBalance)}</p>
                  :
                  <Skeleton className="-mt-5 w-24 h-8" />
              }
            </CardContent>
          </Card>

          <Card className="flex-1 max-w-[300px] hidden md:block">
            <CardHeader>
              <CardTitle className='text-sm font-normal'>
                <div className='flex justify-between items-center'>
                  <p className="text-primary/70">Total Daily Risk</p>
                  <CandlestickChart size={16} className="text-primary/70"/>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {
                data ?
                  <p className='text-2xl -mt-5 font-semibold text-primary'>${to2dp(data?.currentBalance * data.percentDailyRisk / 100)}</p>
                  :
                  <Skeleton className="-mt-5 w-24 h-8" />
              }
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="mt-4 flex overflow-auto">
        {
          trades ?
            <DataTable columns={columns} data={trades}></DataTable>
            :
            <Skeleton className="w-full h-36" />
        }
      </div>

      <div className="mt-8 flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-secondary">
          {data && data.profitLoss > 0 && <div className="h-full bg-primary/80 rounded-full" style={{ width: `${Math.min(100, data.profitLoss * 100 / data.target)}%` }} />}
        </div>
        <div className="flex items-center w-24 h-2 text-primary/80"><Award className="mr-1" size={20} strokeWidth={1.8} /> {data ? <p>${to2dp(data.target)}</p> : <Skeleton className="flex-1 h-[20px] rounded-full" />}</div>
      </div>

      <div className="flex flex-col md:flex-row mt-8 gap-4">
        {
          data && trades ?

            <>
              <Card className="p-4 text-sm w-full md:w-64 items-center flex-1">
                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Realised P & L</p>
                  <p className="  w-12 text-center">${to2dp(data.profitLoss)}</p>
                </div>

                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Price Accumulator</p>
                  <p className="  w-12 text-center">{data.priceAccumulator}</p>
                </div>

                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Allocated Risk</p>
                  <p className="  w-12 text-center">${to2dp(allocatedRisk ?? 0)}</p>
                </div>

                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Trade Count</p>
                  <p className="  w-12 text-center">{trades.length}</p>
                </div>

              </Card>

              <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
                <NeedlePieChart data={theme == "dark" ? DATA1Dark : DATA1} needleColor={theme == "dark" ? needleDark : needleLight} needleValue={100 * (data.currentBalance * data.percentDailyRisk / 100 - (allocatedRisk ?? 0)) / (data.currentBalance * data.percentDailyRisk / 100)} />
                <h3 className="font-semibold text-sm">Available Risk</h3>
                <h3 className="font-semibold">${to2dp(data.currentBalance * data.percentDailyRisk / 100 - (allocatedRisk ?? 0))}</h3>
              </Card>

              <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
                <NeedlePieChart data={theme=="dark" ? DATA1Dark : DATA1} needleColor={theme == "dark" ? needleDark : needleLight} needleValue={data.losses || data.wins ? data.wins * 100 / (data.wins + data.losses) : 100} />
                <h3 className="font-semibold text-sm">Win Ratio</h3>
                <h3 className="font-semibold">{data.losses || data.wins ? to2dp(data.wins * 100 / (data.wins + data.losses)) : 100}%</h3>
              </Card>

              <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
                <NeedlePieChart data={theme == "dark" ? DATA2Dark :  DATA2} needleColor={theme == "dark" ? needleDark : needleLight} needleValue={data.profitLoss * 50 / data.target + 50} />
                <h3 className="font-semibold text-sm">P & L</h3>
                <h3 className="font-semibold">${to2dp(data.profitLoss)}</h3>
              </Card>

            </>

            :

            <>
              {[...new Array(4)].map((_, i) => <Skeleton key={i} className="flex-1 md:w-56 h-40" />)}
            </>
        }

      </div>

      <ResetProfitLossButton />


    </Card>


  )
}

export default App
