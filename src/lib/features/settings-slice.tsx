'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  value: settingsState;
}

interface settingsState {
  infoModalIsOpen: boolean;
  darkMode: boolean;
  difficulty: 'easy' | 'medium' | 'hard'
}

const initialState = {
  value: {
    infoModalIsOpen: false,
    darkMode: false,
    difficulty: 'easy'
  } as settingsState
} as InitialState;

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    openInfoModal: (state) => {
      state.value.infoModalIsOpen = true;
    },
    closeInfoModal: (state) => {
      state.value.infoModalIsOpen = false;
    },
  }
})

export const { openInfoModal, closeInfoModal } = settings.actions;
export default settings.reducer;