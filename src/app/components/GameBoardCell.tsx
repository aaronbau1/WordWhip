import { useState } from "react";

interface GameBoardCellProps {
  id: number,
  value: string,
  onDrop: (id: number, value: string) => void;
}

const GameBoardCell = ({ id, value, onDrop }: GameBoardCellProps) => {
  
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false)
  
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
    <div className={`bg-gray-300 flex items-center justify-center text-2xl 
      font-bold text-gray-700 border border-black/60
      ${isHighlighted ? 'bg-red-700' : 'bg-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {value}
    </div>
  )
}

export default GameBoardCell