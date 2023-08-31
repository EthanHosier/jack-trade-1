import { Button } from "./components/ui/button"
import { Atom, Award, BarChart4, Plus } from "lucide-react"
import { Card } from "./components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "./components/ui/input"
import { DataTable } from "./data-table/data-table"

import { Trade, columns } from "./data-table/columns";

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

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <Card className="h-full w-full p-4 xl:p-12 max-w-[1200px] overflow-auto">
        <h1 className="text-xl font-semibold">Add Trade</h1>

        <div className="flex items-center mt-4 gap-4">
          <AlertDialog>
            <AlertDialogTrigger className="p-2 rounded-md bg-primary"><Plus color="white"/></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-4">Add New Trade</AlertDialogTitle>

                <div className="flex gap-4 items-center">
                  <h2 className="w-32">
                    Market
                  </h2>
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 items-center">
                  <h2 className="flex items-center w-32">
                    Trade Strategy <BarChart4 size={16} color="#7CBA68" className="ml-1" />
                  </h2>

                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 items-center">
                  <h2 className=" w-32">
                    Stop Size (prices)
                  </h2>
                  <Input className="flex-1" type="number" name="quantity" min="0" step="1" />
                </div>

                <div className="flex gap-4 items-center">
                  <h2 className=" w-32">
                    A/B/C Rating
                  </h2>
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="A/B/C" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant={"secondary"} className="aspect-square w-10 h-10 p-2"><Atom/></Button>
        </div>

        <div className="mt-4 flex overflow-auto">
          <DataTable columns={columns} data={DATA}></DataTable>
          <div className="px-2 ml-2 flex-1 bg-gray-200">
            <p>Trade Controls</p>
            <p className="text-gray-400"><i>todo</i></p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-gray-200" />
          <p className="flex items-center"><Award className="mr-1" size={20} strokeWidth={1.8} /> $75.00</p>
        </div>

        <div className="flex-col md:flex mt-4 gap-4">
          <Card className="p-4 text-sm w-full md:w-64 items-center">
            <div className="flex gap-4 mb-2">
              <p className="  w-36">Realised P & L</p>
              <p className="  w-12 text-center">$0.00</p>
            </div>

            <div className="flex gap-4 mb-2">
              <p className="  w-36">Price Accumulator</p>
              <p className="  w-12 text-center">0</p>
            </div>

            <div className="flex gap-4 mb-2">
              <p className="  w-36">Price Accumulator</p>
              <p className="  w-12 text-center">$0.00</p>
            </div>

            <div className="flex gap-4 mb-2">
              <p className="  w-36">Price Accumulator</p>
              <p className="  w-12 text-center">0</p>
            </div>

          </Card>


          <Card className="flex-1 flex items-center mt-4 md:mt-0 p-2">
            <div className="p-2 rounded flex-1 bg-gray-200 h-3/4">
              <p>Other graph stuff</p>
              <p className="text-gray-400"><i>todo</i></p>
            </div>
          </Card>

        </div>

      </Card>
    </div>


  )
}

export default App
