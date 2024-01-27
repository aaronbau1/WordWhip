'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  value: levelState;
}

interface levelState {
  //board creation
  level: number;
  rows: number;
  columns: number;
  gameBoardLines: number[];
  wordLength: number;
  tiles: number;
}

const initialState = {
  value: {  
    level: 1,
    rows: 3,
    columns: 3,
    gameBoardLines: [0, 1, 2],
    wordLength: 3,
    tiles: 1,
  } as levelState
} as InitialState;

export const levelState = createSlice({
  name: 'levelState',
  initialState,
  reducers: {
    resetGame: (state) => {
      state = initialState;
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
      state.value.wordLength += 1;
    },
    addTile: (state) => {
      state.value.tiles += 1;
    },
  }
})

export const { 
  resetGame,
  addLevel,
  addRow,
  addColumn,
  addTile,
  increaseWordLength,
  // addLine,
} = levelState.actions;
export default levelState.reducer;