'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  value: gameStateState;
}

interface gameStateState {
  //current level
  wins: number;
  losses: number;

  //turn progression
  levelUpModalIsOpen: boolean;
  gameOverModalIsOpen: boolean;
}

const initialState = {
  value: {
    wins: 0,
    losses: 0,

    levelUpModalIsOpen: false,
    gameOverModalIsOpen: false,
  } as gameStateState
} as InitialState;

export const gameState = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    resetGameState: (state) => {
      return initialState
    },
    addWin: (state) => {
      state.value.wins += 1;
    },
    addLoss: (state) => {
      state.value.losses += 1;
    },
    clearWinsLosses: (state) => {
      state.value.wins = 0;
      state.value.losses = 0;
    },
    openLevelUpModal: (state) => {
      state.value.levelUpModalIsOpen = true;
    },
    closeLevelUpModal: (state) => {
      state.value.levelUpModalIsOpen = false;
    },
    openGameOverModal: (state) => {
      state.value.gameOverModalIsOpen = true;
    },
    closeGameOverModal: (state) => {
      state.value.gameOverModalIsOpen= false;
    }
  }
})

export const { 
  addWin, 
  addLoss, 
  clearWinsLosses, 
  openLevelUpModal,
  closeLevelUpModal, 
  openGameOverModal,
  closeGameOverModal,
  resetGameState,
} = gameState.actions;
export default gameState.reducer;