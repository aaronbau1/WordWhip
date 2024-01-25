'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  value: gameStateState;
}

interface gameStateState {
  wins: number;
}

const initialState = {
  value: {
    wins: 0,

  } as gameStateState
} as InitialState;

export const gameState = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    addWin: (state) => {
      state.value.wins += 1;
    },
    clearWinsLosses: (state) => {
      state.value.wins = 0;
    },
  }
})

export const { addWin, clearWinsLosses } = gameState.actions;
export default gameState.reducer;