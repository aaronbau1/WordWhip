"use client"

import { useState } from 'react';

import { observer, useLocalObservable } from "mobx-react-lite";

import GameBoard from "./components/GameBoard";
import InstructionBar from "./components/InstructionBar";
import NavBar from "./components/NavBar";
import TilesBar from "./components/TilesBar";
import GameStore from "../../stores/GameStore";
import Clock from "./components/Clock";

function handleOnDrag(e: React.DragEvent, value: string) {
  e.dataTransfer.setData('value', value)
}

function handleOnDrop(e: React.DragEvent) {
  const value = e.dataTransfer.getData('value') as string;
  console.log('tile value: ', value);
  //setGameBoard([...gameBoard, value])
}

function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}

export default observer(function Home() {
  const store = useLocalObservable(() => GameStore)

  const [gameBoard, setGameBoard] = useState<string>('')

  return (
    <div className="flex h-screen min-h-screen flex-col bg-gray-500">
      <NavBar />
      <div className="flex flex-col-2 justify-center space-x-12">
        <InstructionBar />
        <Clock />
      </div>
      <GameBoard onDrop={handleOnDrop} onDragOver={handleDragOver}/>
      <TilesBar handleOnDrag={handleOnDrag}/>
    </div>
  )
})
