import { ColumnDef } from "@tanstack/react-table"

//TODO: replace the string with actual enum ish string types: "a" | "b" | "c"
export type Trade = {
  id: string
  exchange: string,
  market: string,
  strategy: string,
  abc: "A" | "B" | "C",
  stopSize: number,
  risk: number,
  tradeStatus: "Awaiting Fill" | "Completed idk",
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
    accessorKey: "strategy",
    header: "Strategy",
  },
  {
    accessorKey: "abc",
    header: "ABC",
  },
  {
    accessorKey: "stopSize",
    header: "Risk",
  },
  {
    accessorKey: "tradeStatus",
    header: "Trade Status",
  },
  {
    accessorKey: "position",
    header: "position",
  },
  {
    accessorKey: "plusMinus",
    header: "+ | -",
  },
]