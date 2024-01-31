'use client'

import Clock from "./Clock";
import { useAppSelector } from "@/lib/store";

interface WinCounterProps {
  wins: number;
}

interface LossCounterProps {
  losses: number;
}

const WinCounter = ({ wins }:WinCounterProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-2 mt-4">
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
      <div className="flex justify-between gap-2 mt-4">
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
  const level = useAppSelector((state) => state.levelState.value.level);
  
  return (
    <>
    <div className="flex flex-col-3 justify-center space-x-8">
      <WinCounter wins={wins} />
      <div className="font-bold text-2xl text-white mt-1 outline-4 outline-black">{level}</div>
      <LossCounter losses={losses} />
    </div>
    </>
  )
}

export default LevelDashboard;