import { ColumnDef } from "@tanstack/react-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, Pen } from "lucide-react"
import DeleteTrade from "@/components/trades/trade-controls/DeleteTrade"

export type Trade = {
  id: string
  exchange: string,
  market: string,
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
  },
  {
    accessorKey: "plusMinus",
    header: "+/-",
  },
  {
    id: "actions",
    header: "Trade Controls",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 w-full">

          {/* TICK */}
          <AlertDialog>
            <AlertDialogTrigger><Check color="green"/></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tick thing</AlertDialogTitle>
                <AlertDialogDescription>
                  Idk
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DeleteTrade id={row.original.id}/>

          {/* Pen */}
          <AlertDialog>
            <AlertDialogTrigger><Pen className="text-secondary-foreground"/></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit Trade</AlertDialogTitle>
                <AlertDialogDescription>
                  idk
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      )
    }
  }
]