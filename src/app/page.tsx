"use client"

import { observer, useLocalObservable } from "mobx-react-lite";

import GameGrid from "./components/GameGrid";
import InstructionBar from "./components/InstructionBar";
import NavBar from "./components/NavBar";
import TilesBar from "./components/TilesBar";
import GameStore from "../../stores/GameStore";

export default observer(function Home() {
  const store = useLocalObservable(() => GameStore)
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-200">
      <NavBar />
      <InstructionBar />
      <GameGrid />
      <TilesBar />
    </div>
  )
})
