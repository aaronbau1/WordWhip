"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { useInfoModal } from "@/context/InfoModalContext"
import { DialogClose } from "@radix-ui/react-dialog";
import { Info, X } from "lucide-react";
import { useEffect } from "react";

export function InfoModal() {

  const {isInfoModalOpen, openInfoModal, closeInfoModal } = useInfoModal();

  return (
    <Dialog open={isInfoModalOpen} onOpenChange={() => isInfoModalOpen ? closeInfoModal : openInfoModal}>
      <DialogTrigger asChild>
        <Info className='h-10 w-10 mr-5 text-white/50 cursor-pointer' onClick={openInfoModal}/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" onClick={closeInfoModal} />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>How to play WordWhip</DialogTitle>
          <DialogDescription>Follow these steps to play the game. Click Got it! when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm leading-7">Step 1: Choose your character from the selection screen.</p>
          <p className="text-sm leading-7">Step 2: Navigate through the game world using the arrow keys.</p>
          <p className="text-sm leading-7">Step 3: Collect power-ups and avoid enemies to increase your score.</p>
          <p className="text-sm leading-7">Step 4: Reach the end of the level to progress to the next stage.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => closeInfoModal()}>Got it!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
