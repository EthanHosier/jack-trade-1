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
import { Crosshair } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useToast } from '@/components/ui/use-toast'

const Position = ({id}: {id: string}) => {
  const [position, setPosition] = useState<string>("");

  const {toast} = useToast();

  const handleInputChange = (event: any) => {
    const newValue = event.target.value;

    // Use a regular expression to check if the input is a valid number
    // This regex allows decimal numbers, positive or negative
    const validNumberRegex = /^-?\d*\.?\d*$/;

    if (validNumberRegex.test(newValue)) {
      // The input is a valid number, update the state
      setPosition(newValue);
    }
  };

  const onSubmit = () => {
    updateDoc(doc(db, "trades", id), {
      position: Number(position),
    })
    .then(() => {
      toast({
        title: "Position added",
        description: "Successfully added new position."
      })
    })
    .catch(() => {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: "Error adding new position.",
      })
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger><Crosshair className="text-orange-400" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center'>Manual Trade Allocation</AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            
          </AlertDialogDescription>
          <div className="flex gap-4 items-center">
            <h2 className=" w-24">
              Position Size
            </h2>
            <Input className="flex-1" type="text" name="quantity" value={position} onChange={handleInputChange} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!position} onClick={onSubmit}>Buy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Position