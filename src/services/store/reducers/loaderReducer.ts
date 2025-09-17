import { createAction, createReducer } from '@reduxjs/toolkit';

// State

const initialState: { isLoaderActive: boolean } = {
  isLoaderActive: true
};

// Actions

export const toggleLoader = createAction<boolean>('loader/toggleLoader');

// Reducer

export const loaderReducer = createReducer(initialState, (builder): void => {
  builder
    .addCase(toggleLoader, (state, action): void => {
      state.isLoaderActive = action.payload;
    })
});
