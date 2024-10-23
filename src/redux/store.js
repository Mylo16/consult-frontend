import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import playerSelectReducer from './playerSelectSlice';
import { loadState, saveState } from '../utils/localStorage';
import transfersReducer from './transfersSlice';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    squad: playerSelectReducer,
    transfer: transfersReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    squad: store.getState().squad,
    transfer: store.getState().transfer,
  });
});

export default store;
