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
import { Input } from "../ui/input"
import { BarChart2, Database, User } from "lucide-react"
import { useEffect, useState } from "react"
import {Data} from "../../App"
import { Skeleton } from "../ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/config"

const EditDataButton = ({data}: {data: Data | null }) => {
  const [newBalance, setNewBalance] = useState<string| undefined>(data?.currentBalance.toString());
  const [target, setTarget] = useState<string | undefined>(data?.target.toString());
  
  const { toast } = useToast()

  const reset = () => {
    setNewBalance(data?.currentBalance.toString());
    setTarget(data?.target.toString());
  }

  const onNewBalanceChange = (event: any) => {
    const newValue = event.target.value;

    const validNumberRegex = /^-?\d*\.?\d*$/;
    if (validNumberRegex.test(newValue)) {
      // The input is a valid number, update the state
      setNewBalance(newValue);
    }
  }

  const onTargetChange = (event: any) => {
    const newValue = event.target.value;

    const validNumberRegex = /^-?\d*\.?\d*$/;
    if (validNumberRegex.test(newValue)) {
      // The input is a valid number, update the state
      setTarget(newValue);
    }
  }
 

  const onSubmit = () => {
    setDoc(doc(db, "data", "1"), {
      currentBalance: Number(newBalance), 
      target: Number(target),
    }).then(() => 
      toast({
        title: "Data Updated.",
        description: "Successfully updated account data.",
      })
    ).catch(() => {
      toast({
        title: "Uh Oh! Something went wrong,",
        description: "Error updating account data.",
        variant:"destructive",
      })
    })

    reset();
  }

  useEffect(() => {
    setNewBalance(data?.currentBalance.toString());
    setTarget(data?.target.toString());
  },[data])

  return (
    <>
    {
      data ? 

      <AlertDialog>
      <AlertDialogTrigger className="p-2 rounded-md bg-secondary"><BarChart2/></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-4">Edit Data</AlertDialogTitle>

          <div className="flex gap-4 items-center">
            <h2 className=" w-36">
              Current Balance ($)
            </h2>
            <Input className="flex-1" type="text" value={newBalance} name="quantity" onChange={onNewBalanceChange}  />
          </div>

          <div className="flex gap-4 items-center">
            <h2 className=" w-36">
              Target ($)
            </h2>
            <Input className="flex-1" type="text" value={target} name="quantity" onChange={onTargetChange} />
          </div>

        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={reset}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={(!newBalance && newBalance != "0") || !target}>Save Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    :
    <Skeleton className="w-10 h-10 rounded-lg" />
    }
    </>
    
  )
}

export default EditDataButton