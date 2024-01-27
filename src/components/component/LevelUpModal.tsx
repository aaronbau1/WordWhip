"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/levelupdialog"
import { AppDispatch, useAppSelector } from "@/lib/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { Info, X } from "lucide-react";
import { useDispatch } from "react-redux";

export function LevelUpModal() {
  const isOpen = useAppSelector((state) => state.settings.value.infoModalIsOpen);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className='h-8 w-8 mr-3 text-white/50 cursor-pointer hover:scale-105 hover:text-white/70
        md:h-10 md:w-10 md:mr-5'
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">        
        <DialogHeader>
          <DialogTitle className="font-2xl">Level Up!</DialogTitle>
          <DialogDescription className="font-semibold">How would you like to increase the difficulty?</DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex justify-center mx-2">
            <Button variant="outline">
              <Info />
              Add a row
            </Button>
            <Button variant="outline" className="ml-4">Add a tile</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
