'use client';

import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from './features/gameState-slice';
import infoModalReducer from './features/infoModal-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    infoModal: infoModalReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;