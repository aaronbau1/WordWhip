"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/levelupdialog"
import { closeLevelUpModal, openLevelUpModal } from "@/lib/features/gameState-slice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { Info } from "lucide-react";
import { useDispatch } from "react-redux";
import { getRandomIndex } from "../../../lib/hooks";
import { levelUpOptions } from "../../../lib/data";
import { addColumn, addRow } from "@/lib/features/levelState-slice";

export function LevelUpModal() {
  const isOpen = useAppSelector((state) => state.gameState.value.levelUpModalIsOpen);
  const wordLength = useAppSelector((state) => state.levelState.value.wordLength);

  const dispatch = useDispatch<AppDispatch>();

  const handleModalClose = () => {
    dispatch(closeLevelUpModal());
  }

  const handleModalOpen = () => {
    dispatch(openLevelUpModal());
  }

  const chooseDifficulty = (wordLength: number) => {
    if (wordLength <= 4) {
      return levelUpOptions[getRandomIndex(levelUpOptions)]
    } else {
      let difficulty;
      do {
        difficulty = levelUpOptions[getRandomIndex(levelUpOptions)];
      } while (difficulty !== 'Increase the Word Length');
      return difficulty;
    }
  }

  const addDifficulty = (option:string) => {
    switch(option) {
      case 'Add a Row':
        dispatch(addRow());
        break;
      case 'Add a Column':
        dispatch(addColumn());
        break;
    }
    handleModalClose();
  }

  const option1 = chooseDifficulty(wordLength);
  const option2 = chooseDifficulty(wordLength);

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
            <Button variant="outline" onClick={() => addDifficulty(option1)}>
              {option1}
            </Button>
            <Button variant="outline" className="ml-4" onClick={() => addDifficulty(option2)}>
              {option2}
            </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
