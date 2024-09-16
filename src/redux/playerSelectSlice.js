import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forwards: [[], [], []],
  midfielders: [[], [], [], [], []],
  defenders: [[], [], [], [], []],
  goalkeepers: [[], []],
};

const playerSelectSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      const { category, player, pos } = action.payload;
      state[category][pos] = player;
    },
  },
});

export const { addPlayer, removePlayer, restorePlayer } = playerSelectSlice.actions;

export default playerSelectSlice.reducer;
