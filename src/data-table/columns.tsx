import { ColumnDef } from "@tanstack/react-table"
import DeleteTrade from "@/components/trades/trade-controls/DeleteTrade"
import Position from "@/components/trades/trade-controls/Position"
import ProfitLoss from "@/components/trades/trade-controls/ProfitLoss"
import { MARKETS } from "@/lib/constants"

export type Trade = {
  id: string
  exchange: string,
  market: string,
  stopSize: number,
  risk: number,
  tradeStatus: "Awaiting Fill" | "Live",
  position: string,
  plusMinus: number,
}

export const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: "exchange",
    header: "Exchange",
  },
  {
    accessorKey: "market",
    header: "Market",
  },
  {
    accessorKey: "stopSize",
    header: "Stop Size",
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <p className="font-bold text-primary">{row.original.risk}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "tradeStatus",
    header: "Trade Status",
    cell: ({row}) => <p className={`font-semibold ${row.original.tradeStatus == "Awaiting Fill" ? "text-orange-400" : "text-green-600"} `}>{row.original.tradeStatus}</p>
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({row}) => {
      if(row.original.position) return row.original.position;

      return (
        <Position id={row.original.id}/>
      )
    }
  },
  {
    accessorKey: "",
    header: "+/-",
  },
  {
    id: "actions",
    header: "Trade Controls",
    cell: ({ row }) => {
      const foundMarket = MARKETS.find(m => m.name == row.original.market);

      if(foundMarket == null) return <p>Invalid Market</p>

      return (
        <div className="flex gap-4 w-full">

          <ProfitLoss numOfContracts={+row.original.position} tickSize={foundMarket.tick} id={row.original.id}/>
          <DeleteTrade id={row.original.id}/>

        </div>
      )
    }
  }
]