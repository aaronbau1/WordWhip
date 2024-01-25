import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animate } from "framer-motion/dom"

interface GameBoardCellProps {
  id: number,
  value: string,
  onDrop: (id: number, value: string) => void;
  isMatched: boolean;
}

const getVariants = () => ({
  highlight: {
    backgroundColor: '#E53935',
    transition: {
      duration:0,
    }
  },
  normal: {
    backgroundColor: '#E0E0E0'
  },
  win: {
    backgroundColor: '#50C878',
    rotateX: [0, 90, 0], 
    transition: {
      delay: 0.25,
      duration: 1,
    } 
  }
})

const GameBoardCell = ({ id, value, onDrop, isMatched, }: GameBoardCellProps) => {
  
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  useEffect(() => {
    if (isMatched) {
      // Additional logic when the cell is matched
    }
  }, [isMatched]);
  
  // const handleWinAnimationComplete = () => {
    
  // };

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

  return (
    <motion.div className={`bg-gray-300 flex items-center justify-center text-2xl 
      font-bold text-gray-700 border border-black/60`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={isMatched ? 'win' : (isHighlighted ? 'highlight' : 'normal')}
      // onAnimationComplete={isMatched ? handleWinAnimationComplete : undefined}
      variants={getVariants()}
    >
      {value}
    </motion.div>
  )
}

export default GameBoardCell