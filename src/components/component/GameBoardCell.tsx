import { useState } from "react";
import { motion } from "framer-motion";

interface GameBoardCellProps {
  id: number,
  value: string,
  onDrop: (id: number, value: string) => void;
  isMatched: boolean;
  isWin: boolean;
}

const getVariants = (isWin:boolean) => ({
  highlight: {
    backgroundColor: '#E53935',
    transition: {
      duration:0,
    }
  },
  normal: {
    backgroundColor: '#E0E0E0'
  },
  outcome: {
    backgroundColor: isWin ? '#50C878' : '#E53935',
    rotateX: [0, 90, 0], 
    transition: {
      delay: 0.25,
      duration: 1,
    } 
  }
})

const GameBoardCell = ({ id, value, onDrop, isMatched, isWin }: GameBoardCellProps) => {
  
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHighlighted(true);
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHighlighted(false);

    const draggedValue = event.dataTransfer.getData("text/plain");
    onDrop(id, draggedValue);
  };

  const handleAnimationLogic = () => {
    if (isMatched) {
      return 'outcome';
    } else if (isHighlighted) {
      return 'highlight';
    } else {
      return 'normal';
    }
  }

  return (
    <motion.div className={`bg-gray-300 flex items-center justify-center text-2xl 
      font-bold text-gray-700 border border-black/60 aspect-square`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={handleAnimationLogic()}
      variants={getVariants(isWin)}
    >
      {value}
    </motion.div>
  )
}

export default GameBoardCell