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
import { Ban } from 'lucide-react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useToast } from '@/components/ui/use-toast'

const DeleteTrade = ({ id }: { id: string }) => {

  const { toast } = useToast();

  const onClick = () => {
    deleteDoc(doc(db, "trades", id))
      .then(() =>
        toast({
          title: "Trade Deleted",
          description: "Successfully deleted trade",
        })
      ).catch(() => {
        toast({
          title: "Uh Oh! Something went wrong,",
          description: "Error deleting trade",
          variant: "destructive",
        })
      })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger><Ban className="text-destructive" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your trade from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={onClick}>Delete Trade</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTrade