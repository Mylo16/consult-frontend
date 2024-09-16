import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import playerSelectReducer from './playerSelectSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    players: playerSelectReducer,
  },
});

export default store;
