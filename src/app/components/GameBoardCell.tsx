import { useState } from "react";

interface GameBoardCellProps {
  id: number,
  value: string,
}

const GameBoardCell = ({ id, value }: GameBoardCellProps) => {
  
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false)
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

     // Get the center coordinates of the cell
     const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
     const cellCenterX = left + width / 2;
     const cellCenterY = top + height / 2;

     // Calculate the distance from the mouse pointer to the cell's center
    const offsetX = event.clientX - cellCenterX;
    const offsetY = event.clientY - cellCenterY;

    // snapping distance threshold
    const threshold = 50;

    if (Math.abs(offsetX) <= threshold && Math.abs(offsetY) <= threshold) {
      setIsHighlighted(true);
    }
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };

  return (
    <div className={`bg-gray-300 flex items-center justify-center text-2xl 
      font-bold text-gray-700 border border-black/60
      ${isHighlighted ? 'bg-red-700' : 'bg-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {value}
    </div>
  )
}

export default GameBoardCell