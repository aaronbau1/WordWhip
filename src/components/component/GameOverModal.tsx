"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/cantcloseoutdialog"
import { closeGameOverModal, openGameOverModal, resetGameState } from "@/lib/features/gameState-slice";
import { gameOverPhaseStart } from "@/lib/features/levelState-slice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";

const GameOverModal = () => {
  const isOpen = useAppSelector((state) => state.gameState.value.gameOverModalIsOpen);
  const level = useAppSelector((state) => state.levelState.value.level);


  const dispatch = useDispatch<AppDispatch>();

  const handleModalClose = () => {
    dispatch(closeGameOverModal())
    dispatch(gameOverPhaseStart())
  }

  const handleModalOpen = () => {
    dispatch(openGameOverModal());
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen ? handleModalClose() : handleModalOpen()}>
      <DialogContent className="sm:max-w-[425px]">        
        <DialogHeader>
          <DialogTitle className="flex justify-center font-2xl">Game Over!</DialogTitle>
          <DialogDescription className="flex justify-center font-semibold">You reached level {level}!</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
        <DialogFooter>
          <DialogClose asChild>
              <Button variant="default" className="mb-2 bg-gray-600" onClick={() => handleModalClose()}>
                Play Again?
              </Button>
          </DialogClose>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GameOverModal;