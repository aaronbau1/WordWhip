import { useState } from "react";
import GameBoardCell from "./GameBoardCell"



const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

  const handleDragLeave = () => {
    setHighlightedCell(null);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-6/12 h-6/12 aspect-square relative">
        <div className="grid absolute inset-0 grid-cols-5 gap-0.5 p-1 rounded-md"
          onDragLeave={handleDragLeave}
        >
          {Array.from({ length: 25 }, (_, index) => (
            <GameBoardCell 
              key={index} 
              id={index}
              value={String.fromCharCode(65 + index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoard