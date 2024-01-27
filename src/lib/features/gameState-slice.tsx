'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  value: gameStateState;
}

interface gameStateState {
  //current level
  wins: number;
  losses: number;
  level: number;

  //difficulty variations
  rows: number;
  columns: number;
  gameBoardLines: number[];
  wordLength: number;
  tiles: number;
}

const initialState = {
  value: {
    wins: 0,
    losses: 0,
    level: 1,

    rows: 5,
    columns: 5,
    gameBoardLines: [0, 1, 2, 3, 4],
    wordLength: 5,
    tiles: 1,
  } as gameStateState
} as InitialState;

export const gameState = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    resetGame: (state) => {
      state = initialState;
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
    addLevel: (state) => {
      state.value.level += 1;
    },
    addRow: (state) => {
      state.value.rows += 1;
    },
    addColumn: (state) => {
      state.value.columns += 1;
    },
    // addLine: (state) => {
    //   state.value.gameBoardLines = [];
    // },
    increaseWordLength: (state) => {
      if (state.value.wordLength <= 4) state.value.wordLength += 1;
    },
    addTile: (state) => {
      state.value.tiles += 1;
    },
  }
})

export const { addWin, addLoss, clearWinsLosses, addLevel } = gameState.actions;
export default gameState.reducer;