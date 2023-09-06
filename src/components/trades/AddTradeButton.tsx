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
import { useTheme } from "../theme-provider"


const AddTradeButton = () => {
  const [stopSize, setstopSize] = useState<string>('');
  const [market, setMarket] = useState<"ES" | "MES">("ES");

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
    addDoc(collection(db, "trades"), {
      stopSize: Number(stopSize),
      market,
    }).then(() =>
      toast({
        title: "Trade Added",
        description: "Successfully added new trade",
      })
    ).catch(() => {
      toast({
        title: "Uh Oh! Something went wrong,",
        description: "Error adding new trade",
        variant: "destructive",
      })
    })

    reset();
  }

  const reset = () => {
    setstopSize("");
  }

  const { theme } = useTheme();

  return (
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
  )
}

export default AddTradeButton