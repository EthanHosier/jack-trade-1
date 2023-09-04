import { Award, BarChart4, DollarSign } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from "./data-table/data-table"

import { Trade, columns } from "./data-table/columns";
import { useEffect, useState } from "react"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "./firebase/config"
import AddTradeButton from "./components/trades/AddTradeButton"
import EditDataButton from "./components/trades/EditDataButton";
import { to2dp } from "./lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import NeedlePieChart from "./components/trades/NeedlePieChart";

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

const DATA: Trade[] = [
  {
    id: "124",
    exchange: "NASDAQ",
    market: "AAPL",
    strategy: "breakout",
    abc: "B",
    stopSize: 15,
    risk: 1.5,
    tradeStatus: "Awaiting Fill",
    position: "long",
    plusMinus: 0
  },
  {
    id: "125",
    exchange: "NYSE",
    market: "IBM",
    strategy: "trend-following",
    abc: "A",
    stopSize: 12,
    risk: 1.8,
    tradeStatus: "Completed idk",
    position: "short",
    plusMinus: -50
  },
  {
    id: "126",
    exchange: "LSE",
    market: "BP",
    strategy: "mean-reversion",
    abc: "C",
    stopSize: 8,
    risk: 1.2,
    tradeStatus: "Awaiting Fill",
    position: "long",
    plusMinus: 10
  },
  {
    id: "127",
    exchange: "NYSE",
    market: "TSLA",
    strategy: "momentum",
    abc: "B",
    stopSize: 20,
    risk: 2.5,
    tradeStatus: "Completed idk",
    position: "long",
    plusMinus: 80
  },
  {
    id: "128",
    exchange: "BSE",
    market: "INFY",
    strategy: "breakout",
    abc: "A",
    stopSize: 9,
    risk: 1.1,
    tradeStatus: "Awaiting Fill",
    position: "short",
    plusMinus: -15
  },
  {
    id: "129",
    exchange: "ASX",
    market: "CBA",
    strategy: "trend-following",
    abc: "C",
    stopSize: 18,
    risk: 2.2,
    tradeStatus: "Completed idk",
    position: "long",
    plusMinus: 30
  },
  {
    id: "130",
    exchange: "NASDAQ",
    market: "GOOGL",
    strategy: "momentum",
    abc: "B",
    stopSize: 22,
    risk: 2.8,
    tradeStatus: "Awaiting Fill",
    position: "long",
    plusMinus: 5
  },
  {
    id: "131",
    exchange: "LSE",
    market: "HSBA",
    strategy: "mean-reversion",
    abc: "A",
    stopSize: 10,
    risk: 1.3,
    tradeStatus: "Completed idk",
    position: "short",
    plusMinus: -20
  },
  {
    id: "132",
    exchange: "NYSE",
    market: "AMZN",
    strategy: "breakout",
    abc: "C",
    stopSize: 16,
    risk: 1.7,
    tradeStatus: "Awaiting Fill",
    position: "long",
    plusMinus: 15
  }
];

export interface Data {
  currentBalance: number,
  target: number,
}

function App() {

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    //data
    const unsub = onSnapshot(doc(db, "data", "1"), ((doc: any) => {
      setData(doc.data());
    }))

    return () => {
      unsub();
    }
  }, [])

  return (
    <Card className="min-h-full m-4 p-4 xl:p-12 max-w-[1200px]">

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
                <BarChart4 size={16} className="text-primary"/>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl -mt-5 font-semibold text-primary'>${data?.currentBalance}</p>
          </CardContent>
        </Card>
      </div>


      <div className="mt-4 flex overflow-auto">
        <DataTable columns={columns} data={DATA}></DataTable>
        <div className="px-2 ml-2 flex-1 bg-secondary">
          <p>Trade Controls</p>
          <p className="text-gray-400"><i>todo</i></p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-secondary">
          <div className="h-full bg-primary w-[75%] rounded-full"/>
        </div>
        <div className="flex items-center w-24 h-2"><Award className="mr-1" size={20} strokeWidth={1.8} /> {data ? <p>${to2dp(data.target)}</p> : <Skeleton className="flex-1 h-[20px] rounded-full" />}</div>
      </div>

      <div className="flex flex-col md:flex-row mt-8 gap-4">
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
            <p className="  w-12 text-center">0</p>
          </div>

        </Card>

        <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
          <NeedlePieChart data={DATA1}/>
          <h3 className="font-semibold">Available Risk</h3>
          <h3 className="font-semibold">$xx.xx</h3>
        </Card>

        <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
          <NeedlePieChart data={DATA1}/>
          <h3 className="font-semibold">Win Ratio</h3>
          <h3 className="font-semibold">100%</h3>
        </Card>

        <Card className="md:w-56 flex-1 flex flex-col items-center justify-center p-4">
          <NeedlePieChart data={DATA2}/>
          <h3 className="font-semibold">P & L</h3>
          <h3 className="font-semibold">$xx.xx</h3>
        </Card>

        

      </div>



    </Card>


  )
}

export default App
