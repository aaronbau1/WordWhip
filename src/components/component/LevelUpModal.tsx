"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/levelupdialog"
import { closeLevelUpModal, openLevelUpModal } from "@/lib/features/gameState-slice";
import { AppDispatch, RootState, useAppSelector } from "@/lib/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { connect, useDispatch } from "react-redux";
import { getRandomIndex } from "../../../lib/hooks";
import { addColumnLines, levelUpPhaseStart, addDiagonalLines } from "@/lib/features/levelState-slice";

interface levelUpOptionsProps {
  levelUpOptions: string[];
}

const LevelUpModal = ({levelUpOptions}:levelUpOptionsProps) => {
  const isOpen = useAppSelector((state) => state.gameState.value.levelUpModalIsOpen);

  const dispatch = useDispatch<AppDispatch>();

  const handleModalClose = () => {
    dispatch(closeLevelUpModal());
  }

  const handleModalOpen = () => {
    dispatch(openLevelUpModal());
  }

  const chooseDifficultyOptions = ():string[] => {
    let option1 = levelUpOptions[getRandomIndex(levelUpOptions)]
    let option2: string;
    do {
      option2 = levelUpOptions[getRandomIndex(levelUpOptions)]
    } while (option1 === option2)
    return [option1, option2]
  }

  const options = chooseDifficultyOptions();

  const addDifficulty = (option:string) => {
    switch(option) {
      case 'Words Appear in Columns':
        dispatch(addColumnLines());

        break;
      case 'Words Appear in Diagonals':
        dispatch(addDiagonalLines());
        break;
    }
    handleModalClose();
    dispatch(levelUpPhaseStart())
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen ? handleModalClose : handleModalOpen}>
      <DialogContent className="sm:max-w-[425px]">        
        <DialogHeader>
          <DialogTitle className="flex justify-center font-2xl">Level Up!</DialogTitle>
          <DialogDescription className="flex justify-center font-semibold">How would you like to increase the difficulty?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex flex-col justify-center mx-2">
              <Button variant="outline" className="mb-2 bg-gray-200" onClick={() => addDifficulty(options[0])}>
                {options[0]}
              </Button>
              <Button variant="outline" className=" bg-gray-200" onClick={() => addDifficulty(options[1])}>
                {options[1]}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state: RootState): levelUpOptionsProps => ({
  levelUpOptions: state.levelState.value.levelUpOptions,
});

export default connect(mapStateToProps)(LevelUpModal);