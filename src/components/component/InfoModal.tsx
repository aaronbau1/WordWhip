"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/infodialog"
import { AppDispatch, useAppSelector } from "@/lib/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { Info, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { openInfoModal, closeInfoModal } from "@/lib/features/settings-slice";

export function InfoModal() {
  const isOpen = useAppSelector((state) => state.settings.value.infoModalIsOpen);

  const dispatch = useDispatch<AppDispatch>();

  const handleInfoModalClose = () => {
    dispatch(closeInfoModal());
  }

  const handleInfoModalOpen = () => {
    dispatch(openInfoModal());
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen ? handleInfoModalClose : handleInfoModalOpen}>
      <DialogTrigger asChild>
        <Info className='h-8 w-8 mr-3 text-white/50 cursor-pointer hover:scale-105 hover:text-white/70
        md:h-10 md:w-10 md:mr-5' onClick={handleInfoModalOpen}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" onClick={handleInfoModalClose} />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="font-2xl">How to play WordWhip</DialogTitle>
          <DialogDescription className="font-semibold">You have 60 seconds to solve as many puzzles as possible.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm leading-7">&#x2022; Place your tile on the Gameboard to create a 5 letter word.</p>
          <p className="text-sm leading-7">&#x2022; Placing the tile correctly adds time</p>
          <p className="text-sm leading-7">&#x2022; Placing the tile incorrectly subtracts time and resuffles the board.</p>
          <p className="text-sm leading-7">&#x2022; Be careful! The difficulty will ramp up as you solve more puzzles</p>
          <p className="font-bold">Examples</p>
          <p>Coming soon</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleInfoModalClose}>Got it!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
