"use client"

import { useEffect, useState } from "react";
import { getRandomCapitalLetter } from "../../../lib/hooks";

// interface TileBarProps {
//   updateTileBar: (newTileValue: string) => void;
// }

const TilesBar = () => {

  const [tileValues, setTileValues] = useState<string[]>([]);

  useEffect(() => {
    setTileValues([getRandomCapitalLetter(), getRandomCapitalLetter()]);
  }, []);

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, value: string | null, index: number) => {
    if (value) {
      event.dataTransfer.setData("text/plain", value);
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.style.opacity = "1";
      }
    }
  };

  // const handleOnDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
  //   // setTileValue(isDropOnGameBoardCell ? getRandomCapitalLetter() : tileValue);
  //   // updateTileBar(newTileValue);
  // };

  // const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   // Check if the drop occurred on a valid game cell
  //   const isDropOnGameBoardCell = event.target instanceof HTMLElement && event.target.classList.contains('data-test');

  //   // Update the tile value based on the validity of the drop
  //   setTileValue(isDropOnGameBoardCell ? getRandomCapitalLetter() : tileValue);
  // };

  return (
    <div className="flex items-center justify-center pt-8 pb-4">
      { 
        tileValues.map((value, index) => (
          <div
            className='flex h-14 w-14 border-2 border-black/60 items-center 
            justify-center bg-gray-300 text-2xl font-bold text-gray-700 
            cursor-pointer m-1'
            draggable
            onDragStart={(e) => handleOnDrag(e, value, index)}
          >
            {value}
          </div>
        ))      
      }
    </div>
  )
}

export default TilesBar