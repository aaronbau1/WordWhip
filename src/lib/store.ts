'use client';

import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from './features/gameState-slice';
import settingsReducer from './features/settings-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    settings: settingsReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;