'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  value: infoModalState;
}

interface infoModalState {
  isOpen: boolean;
}

const initialState = {
  value: {
    isOpen: false,
  } as infoModalState
} as InitialState;

export const infoModal = createSlice({
  name: 'infoModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.value.isOpen = true;
    },
    closeModal: (state) => {
      state.value.isOpen = false;
    },
  }
})

export const { openModal, closeModal } = infoModal.actions;
export default infoModal.reducer;