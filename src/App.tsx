import { Award, CandlestickChart } from "lucide-react"

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

const DATA1 = [
  { name: 'A', value: 25, color: '#eeeeee' }, // White
  { name: 'B', value: 25, color: '#cccccc' }, // Light Gray
  { name: 'C', value: 25, color: '#999999' }, // Medium Gray
  { name: 'D', value: 25, color: '#666666' }, // Dark Gray
];

const DATA2 = [
  { name: 'A', value: 25, color: '#FF0000' }, // White
  { name: 'B', value: 25, color: '#FF8000' }, // Light Gray
  { name: 'C', value: 25, color: '#80FF00' }, // Medium Gray
  { name: 'D', value: 25, color: '#00FF00' }, // Dark Gray
];


export interface Data {
  currentBalance: number,
  target: number,
}

function App() {

  const [data, setData] = useState<Data | null>(null);
  const [trades, setTrades] = useState<Trade[] | null>(null);

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
          tradeStatus: data.status,
          position: "",
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

  return (
    <Card className="min-h-full m-4 p-4 xl:p-8 max-w-[1200px] lg:mx-auto">

      <div className="flex justify-between">
        <div className="mr-16">
          <h1 className="text-xl font-semibold">Add Trade</h1>

          <div className="flex items-center mt-4 gap-4">

            <AddTradeButton />

            <EditDataButton data={data} />

          </div>
        </div>

        <Card className="flex-1 max-w-[300px]">
          <CardHeader>
            <CardTitle className='text-sm font-normal'>
              <div className='flex justify-between items-center'>
                <p>Total Balance</p>
                <CandlestickChart size={16} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {
              data ?
                <p className='text-2xl -mt-5 font-semibold text-primary'>${data?.currentBalance}</p>
                :
                <Skeleton className="-mt-5 w-24 h-8" />
            }
          </CardContent>
        </Card>
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
          <div className="h-full bg-primary w-[75%] rounded-full" />
        </div>
        <div className="flex items-center w-24 h-2"><Award className="mr-1" size={20} strokeWidth={1.8} /> {data ? <p>${to2dp(data.target)}</p> : <Skeleton className="flex-1 h-[20px] rounded-full" />}</div>
      </div>

      <div className="flex flex-col md:flex-row mt-8 gap-4">
        {
          data && trades ?

            <>
              <Card className="p-4 text-sm w-full md:w-64 items-center flex-1">
                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Realised P & L</p>
                  <p className="  w-12 text-center">$0.00</p>
                </div>

                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Price Accumulator</p>
                  <p className="  w-12 text-center">0</p>
                </div>

                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Allocated Risk</p>
                  <p className="  w-12 text-center">$0.00</p>
                </div>

                <div className="flex gap-4 mb-2 justify-center">
                  <p className="  w-36">Trade Count</p>
                  <p className="  w-12 text-center">{trades.length}</p>
                </div>

              </Card>

              <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
                <NeedlePieChart data={DATA1} />
                <h3 className="font-semibold">Available Risk</h3>
                <h3 className="font-semibold">$xx.xx</h3>
              </Card>

              <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
                <NeedlePieChart data={DATA1} />
                <h3 className="font-semibold">Win Ratio</h3>
                <h3 className="font-semibold">100%</h3>
              </Card>

              <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
                <NeedlePieChart data={DATA2} />
                <h3 className="font-semibold">P & L</h3>
                <h3 className="font-semibold">$xx.xx</h3>
              </Card>

            </>

            :

            <>
              {[...new Array(4)].map((_,i) => <Skeleton key={i} className="flex-1 md:w-56 h-40" />)}              
            </>


        }





      </div>



    </Card>


  )
}

export default App
