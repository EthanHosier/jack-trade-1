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
import { Plus } from "lucide-react"
import { Input } from "../ui/input"
import { MARKETS } from "@/lib/constants"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/firebase/config"

import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "../ui/skeleton"


const AddTradeButton = ({ maxRiskPerTrade }: { maxRiskPerTrade: number | undefined }) => {
  const [stopSize, setstopSize] = useState<string>('');
  const [market, setMarket] = useState<"ES" | "MES">(MARKETS[0].name);

  const handleInputChange = (event: any) => {
    const newValue = event.target.value;

    // Use a regular expression to check if the input is a valid number
    // This regex allows decimal numbers, positive or negative
    const validNumberRegex = /^-?\d*\.?\d*$/;

    if (validNumberRegex.test(newValue)) {
      // The input is a valid number, update the state
      setstopSize(newValue);
    }
  };

  const { toast } = useToast()


  //create new trade
  const onSubmit = () => {
    const foundMarket = MARKETS.find(m => m.name == market);

    //trade risk determined at moment is created (so risk may become updated if max risk changes later - does that even matter tho idk)
    addDoc(collection(db, "trades"), {
      stopSize: Number(stopSize),
      market,
      risk: Math.floor((maxRiskPerTrade ?? 0) / (Number(stopSize) * (foundMarket?.tick ?? Number.MAX_VALUE)))
    }).then(() =>
      toast({
        title: "Trade Added",
        description: "Successfully added new trade.",
      })
    ).catch(() => {
      toast({
        title: "Uh Oh! Something went wrong,",
        description: "Error adding new trade.",
        variant: "destructive",
      })
    })

    reset();
  }

  const reset = () => {
    setstopSize("");
    setMarket(MARKETS[0].name);
  }


  return (
    <>
      {
        maxRiskPerTrade ?

          <AlertDialog>
            <AlertDialogTrigger className="p-2 rounded-md bg-primary"><Plus className="text-accent" /></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-4">Add New Trade</AlertDialogTitle>

                <div className="flex gap-4 items-center">
                  <h2 className="w-32">
                    Market
                  </h2>
                  <Select onValueChange={(e: "MES" | "ES") => setMarket(e)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder={MARKETS[0].name} />
                    </SelectTrigger>
                    <SelectContent>
                      {MARKETS.map((m, i) => <SelectItem value={m.name} key={i}>{m.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>



                <div className="flex gap-4 items-center">
                  <h2 className=" w-32">
                    Stop Size (Prices)
                  </h2>
                  <Input className="flex-1" type="text" name="quantity" value={stopSize} onChange={handleInputChange} />
                </div>



              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel onClick={reset}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onSubmit} disabled={!stopSize}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          :
          
          <Skeleton className="w-10 h-10 rounded-lg" />

    }
    </>
  )
}

export default AddTradeButton