"use client"

import { useState } from "react";

const TilesBar = () => {

  const getRandomCapitalLetter = ():string => {
    // ASCII codes for capital letters range from 65 to 90
    const randomCharCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    const randomCapitalLetter = String.fromCharCode(randomCharCode);
    return randomCapitalLetter;
  }

  const [tileValue, setTileValue] = useState<string>(getRandomCapitalLetter())

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, value: string) => {
    event.dataTransfer.setData("text/plain", value);
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.style.opacity = "1";
    }
  };

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    setTileValue(getRandomCapitalLetter());
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className='flex h-14 w-14 border-2 border-black/60 items-center justify-center bg-gray-300 text-2xl font-bold text-gray-700 cursor-pointer'
        draggable
        onDragStart={(e) => handleOnDrag(e, tileValue)}
        onDragEnd={handleOnDrop}
        style={{ opacity: 1 }}
      >
        {tileValue}
      </div>
    </div>
  )
}

export default TilesBar