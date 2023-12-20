"use client"

import { observer, useLocalObservable } from "mobx-react-lite";

import GameBoard from "./components/GameBoard";
import InstructionBar from "./components/InstructionBar";
import NavBar from "./components/NavBar";
import TilesBar from "./components/TilesBar";
import GameStore from "../../stores/GameStore";
import Clock from "./components/Clock";

export default observer(function Home() {
  const store = useLocalObservable(() => GameStore)
  return (
    <div className="flex h-screen w-screen min-h-screen flex-col bg-gray-500">
      <NavBar />
      <Clock />
      <InstructionBar />
      <GameBoard />
      <TilesBar />
    </div>
  )
})
