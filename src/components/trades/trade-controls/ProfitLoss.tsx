import { useState } from 'react'
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
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { to2dp } from '@/lib/utils'
import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { toast } from '@/components/ui/use-toast'
const ProfitLoss = ({numOfContracts, tickSize, id}:{numOfContracts: number, tickSize: number, id: string}) => {

  const [pricesWinLoss, setPricesWinLoss] = useState<string>("");
  const [dollarWinLoss, setDollarWinLoss] = useState<string>("");

  const [profitLoss, setProfitLoss] = useState<number>(0);

  const onPricesWinLossChange = (event: any) => {
    const newValue = event.target.value;

    // Use a regular expression to check if the input is a valid number
    // This regex allows decimal numbers, positive or negative
    const validNumberRegex = /^-?\d*\.?\d*$/;

    if (validNumberRegex.test(newValue)) {
      // The input is a valid number, update the state
      setPricesWinLoss(newValue);
      setProfitLoss(newValue * numOfContracts * tickSize);
    }
  }

  const onDollarWinLoss = (event: any) => {
    const newValue = event.target.value;

    // Use a regular expression to check if the input is a valid number
    // This regex allows decimal numbers, positive or negative
    const validNumberRegex = /^-?\d*\.?\d*$/;

    if (validNumberRegex.test(newValue)) {
      // The input is a valid number, update the state
      setDollarWinLoss(newValue);
      setProfitLoss(newValue * numOfContracts);
    }
  }

  const onSubmit = () => {
    updateDoc(doc(db, "data", "1"), {
      profitLoss: increment(profitLoss),
      currentBalance: increment(profitLoss),
      wins: increment(profitLoss > 0 ? 1 : 0),
      losses: increment(profitLoss < 0 ? 1 : 0),
      priceAccumulator: increment(pricesWinLoss ? Number(pricesWinLoss) : Number(dollarWinLoss) / tickSize)
    })

    deleteDoc(doc(db, "trades", id))
    .then(() => {
      toast({
        title: profitLoss > 0 ? "Profit Recorded" : "Loss Recorded",
        description: "Your P&L has been adjusted."
      })
    })
    .catch(() => {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: "Error deleting trade.",
        variant: "destructive",
      })
    })

    reset();
  }

  const reset = () => {
    setProfitLoss(0);
    setPricesWinLoss("");
    setDollarWinLoss("");
  }

  return (
    < AlertDialog >
      <AlertDialogTrigger disabled={numOfContracts == 0}><Check className={!numOfContracts ? "text-secondary" : "text-green-500"}/></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Profit / Loss</AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
          <div className="flex gap-4 items-center">
            <h2 className=" w-36">
              # Prices Win / Loss
            </h2>
            <Input className="flex-1" type="text" value={pricesWinLoss} name="quantity" onChange={onPricesWinLossChange}  />
            

            {pricesWinLoss && <p>(${to2dp(profitLoss)})</p>}
          </div>

          <p className='text-center'>OR</p>

          <div className="flex gap-4 items-center">
            <h2 className=" w-36">
              $ Win / Loss
            </h2>
            <Input className="flex-1" type="text" value={dollarWinLoss} name="quantity" onChange={onDollarWinLoss} />
          
            {dollarWinLoss && <p>(${to2dp(profitLoss)})</p>}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={reset}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={!profitLoss}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >

  )
}

export default ProfitLoss