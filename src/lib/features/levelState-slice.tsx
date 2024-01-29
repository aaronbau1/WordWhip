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
  wordLength: number;
  tiles: number;
  columnLines: boolean;
  levelUpPhase: boolean;
  gameBoardLines: number[][];
  levelUpOptions:string[];
}

const initialState = {
  value: {  
    level: 1,
    rows: 5,
    columns: 5,
    wordLength: 5,
    gameBoardLines: [[0,1,2,3,4]],
    tiles: 1,
    columnLines: false,
    levelUpPhase: false,
    levelUpOptions: [
      'Words Appear in Columns',
      'Words Appear in Diagonals',
      'Add Row'
      // 'Extra Tile',
      // 'Reduce Timer',
    ],
  } as levelState
} as InitialState;

export const levelState = createSlice({
  name: 'levelState',
  initialState,
  reducers: {
    resetGame: (state) => {
      state = initialState;
    },
    // addRow: (state) => {
    //   state.value.rows += 1;
    // },
    addLevel: (state) => {
      state.value.level += 1;
    },
    increaseWordLength: (state) => {
      state.value.wordLength += 1;
    },
    addTile: (state) => {
      state.value.tiles += 1;
    },
    addColumnLines: (state) => {
      //hide your eyes from this monstrosity
      state.value.gameBoardLines.push([0,5,10,15,20], [1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24]);
      state.value.levelUpOptions = state.value.levelUpOptions.filter((diff) => diff !== 'Words Appear in Columns');
    },
    addDiagonalLines: (state) => {
      //hide your eyes from this monstrosity
      state.value.gameBoardLines.push([0,6,12,18,24], [20,16,12,8,4]);
      state.value.levelUpOptions = state.value.levelUpOptions.filter((diff) => diff !== 'Words Appear in Diagonals');
    },
    levelUpPhaseEnd: (state) => {
      state.value.levelUpPhase = false;
    },
    levelUpPhaseStart: (state) => {
      state.value.levelUpPhase = true;
    }

  }
})

export const { 
  resetGame,
  addLevel,
  addTile,
  increaseWordLength,
  addColumnLines,
  addDiagonalLines,
  levelUpPhaseStart,
  levelUpPhaseEnd,
  // addRow,
} = levelState.actions;
export default levelState.reducer;