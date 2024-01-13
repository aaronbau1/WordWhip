"use client"

import { useState } from 'react';

import { observer, useLocalObservable } from "mobx-react-lite";

import GameBoard from "./components/GameBoard";
import NavBar from "./components/NavBar";
import TilesBar from "./components/TilesBar";
import Clock from "./components/Clock";
import ScoreBar from './components/ScoreBar';

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

  return (
    <div className="flex h-screen min-h-screen flex-col bg-gray-500">
      <NavBar />
      <div className="flex flex-col-2 justify-center space-x-12">
        <ScoreBar />
        <Clock />
      </div>
      <GameBoard />
    </div>
  )
})
