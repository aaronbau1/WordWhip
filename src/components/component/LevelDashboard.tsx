'use client'

import Clock from "./Clock";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { addWin, clearWinsLosses, addLoss } from "@/lib/features/gameState-slice";

interface WinCounterProps {
  wins: number;
}

interface LossCounterProps {
  losses: number;
}

const WinCounter = ({ wins }:WinCounterProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-2 mt-14">
        <div className={`w-4 h-4 rounded-full ${wins > 0 ? 'bg-green-400' : 'bg-white'}`}></div>
        <div className={`w-4 h-4 rounded-full ${wins > 1 ? 'bg-green-400' : 'bg-white'}`}></div>
        <div className={`w-4 h-4 rounded-full ${wins > 2 ? 'bg-green-400' : 'bg-white'}`}></div>
      </div>
    </div>
  )
};

const LossCounter = ({ losses }: LossCounterProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-2 mt-14">
        <div className={`w-4 h-4 rounded-full ${losses > 0 ? 'bg-red-500' : 'bg-white'}`}></div>
        <div className={`w-4 h-4 rounded-full ${losses > 1 ? 'bg-red-500' : 'bg-white'}`}></div>
        <div className={`w-4 h-4 rounded-full ${losses > 2 ? 'bg-red-500' : 'bg-white'}`}></div>
      </div>
    </div>
  );
};



const LevelDashboard = () => {
  const wins = useAppSelector((state) => state.gameState.value.wins);
  const losses = useAppSelector((state) => state.gameState.value.losses);
  
  return (
    <>
    <div className="flex flex-col-3 justify-center space-x-8">
      <WinCounter wins={wins} />
      <Clock />
      <LossCounter losses={losses} />
    </div>
    </>
  )
}

export default LevelDashboard;