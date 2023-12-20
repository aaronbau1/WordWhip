"use client"

import { observer, useLocalObservable } from "mobx-react-lite";

import GameBoard from "./components/GameBoard";
import InstructionBar from "./components/InstructionBar";
import NavBar from "./components/NavBar";
import TilesBar from "./components/TilesBar";
import GameStore from "../../stores/GameStore";

export default observer(function Home() {
  const store = useLocalObservable(() => GameStore)
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-500">
      <NavBar />
      <InstructionBar />
      <GameBoard />
      {/* <TilesBar /> */}
    </div>
  )
})
