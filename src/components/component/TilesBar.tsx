"use client"

import { useEffect, useState } from "react";
import { getRandomLetter } from "../../../lib/hooks";

interface TilesBarProps {
  tileValues: string[];
}

const TilesBar = ({ tileValues }: TilesBarProps) => {

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, value: string | null, index: number) => {
    if (value) {
      event.dataTransfer.setData("text/plain", value);
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.style.opacity = "1";
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      { 
        tileValues.map((value, index) => (
          <div
            key={index}
            className="flex w-[10vw] h-[10vw] md:h-[70px] md:w-[70px] max-w-screen-md max-h-screen-md 
            border-2 border-black/60 items-center justify-center bg-gray-300
             text-2xl font-bold text-gray-700 cursor-pointer m-1"

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