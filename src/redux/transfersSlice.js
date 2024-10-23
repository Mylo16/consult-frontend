import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toBeTransfered: [],
  transfersLeft: 2,
};

const transfersSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    updateFreeTransfers: (state, action) => {
      const { player } = action.payload;
      if (player.name === state.toBeTransfered[0].name) {
        return;
      } else if (state.transfersLeft > 0) {
        state.transfersLeft -= 1;
        state.toBeTransfered = [];
      } else {
        return;
      }
    },
    
    handleFreeTransfers: (state, action) => {
      const player = action.payload;
      state.toBeTransfered.push(player);
    }
  }
});

export const { handleFreeTransfers, updateFreeTransfers } = transfersSlice.actions;

export default transfersSlice.reducer;
