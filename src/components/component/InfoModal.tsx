"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { useInfoModal } from "@/context/InfoModalContext"
import { DialogClose } from "@radix-ui/react-dialog";
import { Info } from "lucide-react";
import { useEffect } from "react";

export function InfoModal() {

  const {isInfoModalOpen, openInfoModal, closeInfoModal } = useInfoModal();

  // useEffect(() => {
  //   // Open the modal logic based on the state
  //   // isInfoModalOpen ? openInfoModal() : closeInfoModal();

  // }, [isInfoModalOpen]);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline" onClick={openInfoModal}>Open Modal</Button> */}
        <Info className='h-10 w-10 mr-5 text-white/50 cursor-pointer' onClick={openInfoModal}/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to play WordWhip</DialogTitle>
          <DialogDescription>Follow these steps to play the game. Click close when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm leading-7">Step 1: Choose your character from the selection screen.</p>
          <p className="text-sm leading-7">Step 2: Navigate through the game world using the arrow keys.</p>
          <p className="text-sm leading-7">Step 3: Collect power-ups and avoid enemies to increase your score.</p>
          <p className="text-sm leading-7">Step 4: Reach the end of the level to progress to the next stage.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Got it!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
