"use client"

import { useEffect, useState } from "react";
import { getRandomCapitalLetter } from "../../../lib/hooks";

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
    <div className="flex items-center justify-center pt-6 pb-4">
      { 
        tileValues.map((value, index) => (
          <div
            key={index}
            className="flex h-[10vw] w-[10vw] max-w-screen-md max-h-screen-md 
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