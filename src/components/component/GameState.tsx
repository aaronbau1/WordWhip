import { useState } from "react";
import Clock from "./Clock";
import { Button } from "../ui/button";

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



const GameState = () => {
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);

  const handleWin = () => {
    setWins(wins + 1);
  };

  const handleLoss = () => {
    setLosses(losses + 1);
  };
  
  return (
    <>
    {/* <div className="flex flex-col-2 justify-center space-x-12">
      <Button onClick={handleWin}>win</Button>
      <Button onClick={handleLoss}>lose</Button>
    </div> */}
    <div className="flex flex-col-3 justify-center space-x-8">
      <WinCounter wins={wins} />
      <Clock />
      <LossCounter losses={losses} />
    </div>
    </>
  )
}

export default GameState;