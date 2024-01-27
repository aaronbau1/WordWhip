"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/levelupdialog"
import { closeLevelUpModal, openLevelUpModal } from "@/lib/features/gameState-slice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { Info } from "lucide-react";
import { useDispatch } from "react-redux";

export function LevelUpModal() {
  const isOpen = useAppSelector((state) => state.gameState.value.levelUpModalIsOpen);

  const dispatch = useDispatch<AppDispatch>();

  const handleModalClose = () => {
    dispatch(closeLevelUpModal());
  }

  const handleModalOpen = () => {
    dispatch(openLevelUpModal());
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen ? handleModalClose : handleModalOpen}>
      <DialogContent className="sm:max-w-[425px]">        
        <DialogHeader>
          <DialogTitle className="font-2xl">Level Up!</DialogTitle>
          <DialogDescription className="font-semibold">How would you like to increase the difficulty?</DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex justify-center mx-2">
            <Button variant="outline" onClick={handleModalClose}>
              <Info />
              Add a row
            </Button>
            <Button variant="outline" className="ml-4" onClick={handleModalClose}>Add a tile</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
