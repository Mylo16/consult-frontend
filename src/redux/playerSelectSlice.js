import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  FWD: Array(3).fill(null), // 3 forwards
  MID: Array(5).fill(null), // 5 midfielders
  DEF: Array(5).fill(null), // 5 defenders
  GK: Array(2).fill(null),  // 2 goalkeepers
  selectedPlayers: [],
  budget: 100,
  // Derived initial starting and substitute players
  startingForwards: [],
  startingMidfielders: [],
  startingDefenders: [],
  startingGk: [],
  substitutes: [],
};

const playerSelectSlice = createSlice({
  name: 'squad',
  initialState,
  reducers: {
    initializeSquad: (state) => {
      // Set starters from the initial arrays (first n players for starters)
      state.startingForwards = state.FWD.slice(0, 2); // First 2 forwards
      state.startingMidfielders = state.MID.slice(0, 4); // First 4 midfielders
      state.startingDefenders = state.DEF.slice(0, 4); // First 4 defenders
      state.startingGk = state.GK.slice(0, 1); // First goalkeeper

      // Set substitutes (remaining players from the arrays)
      state.substitutes = [
        state.FWD[2], // 1 forward
        state.MID[4], // 1 midfielder
        state.DEF[4], // 1 defender
        state.GK[1],  // 1 goalkeeper
      ];
    },
    addPlayer: (state, action) => {
      const { position, player } = action.payload;

      if (state.selectedPlayers.find(p => p.id === player.id)) {
        alert(`${player.name} is already selected!`);
        return;
      }

      if (state[position].includes(null)) {
        const slotIndex = state[position].indexOf(null);
        state[position][slotIndex] = player;
        state.selectedPlayers.push(player);
        state.budget -= player.price;

        // Re-initialize starters and substitutes after adding players
        playerSelectSlice.caseReducers.initializeSquad(state);
      }
    },
    removePlayer: (state, action) => {
      const { position, player } = action.payload;
      state[position] = state[position].map(p =>
        p && p.id === player.id ? null : p
      );
      state.selectedPlayers = state.selectedPlayers.filter(p => p.id !== player.id);
      state.budget += player.price;

      // Re-initialize starters and substitutes after removing players
      playerSelectSlice.caseReducers.initializeSquad(state);
    },
    squadReset: (state) => {
      state.selectedPlayers = [];
      state.DEF = Array(5).fill(null);
      state.MID = Array(5).fill(null);
      state.FWD = Array(3).fill(null);
      state.GK = Array(2).fill(null);
      state.budget = 100;

      // Reset starters and substitutes to null
      state.startingForwards = [];
      state.startingMidfielders = [];
      state.startingDefenders = [];
      state.startingGk = [];
      state.substitutes = [];
    },
    addSubstitute: (state, action) => {
      const { playerOut, playerIn } = action.payload;

      const swapPlayers = (startingArray, substitutes) => {
        const updatedStarting = startingArray.map(player =>
          player?.id === playerOut.id ? playerIn : player
        );
        const updatedSubstitutes = substitutes.map(player =>
          player?.id === playerIn.id ? playerOut : player
        );

        return { updatedStarting, updatedSubstitutes };
      };

      if (playerOut.position === 'FWD') {
        const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingForwards, state.substitutes);
        state.startingForwards = updatedStarting;
        state.substitutes = updatedSubstitutes;
      } else if (playerOut.position === 'MID') {
        const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingMidfielders, state.substitutes);
        state.startingMidfielders = updatedStarting;
        state.substitutes = updatedSubstitutes;
      } else if (playerOut.position === 'DEF') {
        const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingDefenders, state.substitutes);
        state.startingDefenders = updatedStarting;
        state.substitutes = updatedSubstitutes;
      } else if (playerOut.position === 'GK') {
        const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingGk, state.substitutes);
        state.startingGk = updatedStarting;
        state.substitutes = updatedSubstitutes;
      }
    },
  }
});

export const { addPlayer, removePlayer, squadReset, addSubstitute, initializeSquad } = playerSelectSlice.actions;

export default playerSelectSlice.reducer;
