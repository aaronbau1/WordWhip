import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GameBoardCellProps {
  id: number,
  value: string,
  onDrop: (id: number, value: string) => void;
  isMatched: boolean;
}

const winAnimation = {
  animate: (index: number) => ({
    rotateY: 0,
    transition: {
      delay: 0.2 * index,
    }
  }),
}

const GameBoardCell = ({ id, value, onDrop, isMatched }: GameBoardCellProps) => {
  
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false)
  
  useEffect(() => {
    if (isMatched) {
      // Additional logic when the cell is matched
    }
  }, [isMatched]);
  
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
      font-bold text-gray-700 border border-black/60
      ${isHighlighted ? 'bg-red-600' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={{ 
        backgroundColor: isMatched ? '#50C878': '#E0E0E0',
        rotateX: [0, isMatched ? 90 : 0, 0], 
        transition: {
          delay: 0.25 * id,
          duration: 1,
        } 
        }}

    >
      {value}
    </motion.div>
  )
}

export default GameBoardCell