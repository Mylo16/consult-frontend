import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import playerSelectReducer from './playerSelectSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    squad: playerSelectReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    squad: store.getState().squad,
  });
});

export default store;
