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
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useToast } from '../ui/use-toast'
import { RotateCcw } from "lucide-react"

const ResetProfitLossButton = () => {

  const {toast} = useToast();

  const onReset = () => {
    updateDoc(doc(db, "data", "1"), {
      profitLoss: 0,
      wins: 0,
      losses: 0,
      priceAccumulator: 0,
    }).then(() => {
      toast({
        title: "Reset Completed",
        description: "Successfully reset P & L, Win Ratio and Price Accumulator",
      })
    }).catch(() => {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: "Error resetting P & L, Win Ratio and Price Accumulator",
        variant: "destructive",
      });
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='mt-4 bg-destructive rounded-md text-white p-2 text-sm'><RotateCcw/></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will reset P & L, Win Ratio and Price Accumulator. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-destructive hover:bg-destructive/80' onClick={onReset}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResetProfitLossButton