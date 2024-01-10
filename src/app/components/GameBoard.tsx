import { useState } from "react";
import GameBoardCell from "./GameBoardCell"



const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(25).fill('A'));

  const handleDragLeave = () => {
    setHighlightedCell(null);
  };

  const handleTileDrop = (id: number, value: string) => {
    // Update the boardValues array when a cell is dropped
    const updatedValues = [...boardValues];
    updatedValues[id] = value;
    setBoardValues(updatedValues);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-6/12 h-6/12 aspect-square relative">
        <div className="grid absolute inset-0 grid-cols-5 gap-0.5 p-1 rounded-md"
          onDragLeave={handleDragLeave}
        >
          {boardValues.map((value, index) => (
            <GameBoardCell 
              key={index} 
              id={index}
              value={value}
              onDrop={handleTileDrop}
              //Maybe its best to have the gameboard state managed and then map out the results in a use effect
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoard