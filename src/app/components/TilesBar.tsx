"use client"

import { useState } from "react";

const TilesBar = () => {
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsGrabbing(true);
    document.body.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
    document.body.style.cursor = "default"; // Reset cursor when released
  };

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, value: string) => {
    event.dataTransfer.setData("text/plain", value);
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.style.opacity = "1";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className='flex h-14 w-14 border-2 border-black/60 items-center justify-center bg-gray-300 text-2xl font-bold text-gray-700 cursor-pointer'
        draggable
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragStart={(e) => handleOnDrag(e, 'B')}
        style={{ opacity: 1 }}
      >
        B
      </div>
    </div>
  )
}

export default TilesBar