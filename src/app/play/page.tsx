"use client"

import { useState } from 'react';
import NavBar from '../components/NavBar';
import Clock from '../components/Clock';
import GameBoard from '../components/GameBoard';

const Play = () => {

  return (
    <div className="flex h-screen min-h-screen flex-col bg-gray-500">
      <NavBar />
      <div className="flex flex-col-2 justify-center space-x-12">
        {/* <ScoreBar /> */}
        <Clock />
      </div>
      <GameBoard />
    </div>
  )
}

export default Play
