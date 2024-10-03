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
      state.startingGk = state.GK.slice(0, 1);
      state.startingGk[0] = {...state.startingGk[0], isCaptain: true };

      // Set substitutes (remaining players from the arrays)
      state.substitutes = [
        state.FWD[2], // 1 forward
        state.MID[4], // 1 midfielder
        state.DEF[4], // 1 defender
        state.GK[1],  // 1 goalkeeper
      ];
    },

    makeCaptain: (state, action) => {
      const { player } = action.payload;
        state.startingForwards = state.startingForwards.map((p) => {
          if (p && p.id === player.id) {
            return { ...p, isCaptain: true };
          }
          return { ...p, isCaptain: false };
        });
        state.startingMidfielders = state.startingMidfielders.map((p) => {
          if (p && p.id === player.id) {
            return { ...p, isCaptain: true };
          }
          return { ...p, isCaptain: false };
        });
        state.startingDefenders = state.startingDefenders.map((p) => {
          if (p && p.id === player.id) {
            return { ...p, isCaptain: true };
          }
          return { ...p, isCaptain: false };
        });
        state.startingGk = state.startingGk.map((p) => {
          if (p && p.id === player.id) {
            return { ...p, isCaptain: true };
          }
          return { ...p, isCaptain: false };
        });
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

      const swapPlayersInPosition = (incomingArray, outgoingArray, substitutes) => {
        const updatedOutgoingArray = outgoingArray.filter((player) => player.id !== playerOut.id);
        incomingArray.push(playerIn);
        const updatedIncomingArray = incomingArray;
        const updatedSubstitutes = substitutes.map(player =>
          player?.id === playerIn.id ? playerOut : player
        );

        return {updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes};
      }
    
      const canSubstitute = (positionArray, minCount) => {
        // Ensure the position has the minimum number of players
        const count = positionArray.filter(player => player !== null).length;
        return count > minCount;
      };
    
      if (playerOut.position === 'FWD') {
        if (playerIn.position === 'FWD') {
          // Swap forward for forward
          const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingForwards, state.substitutes);
          state.startingForwards = updatedStarting;
          state.substitutes = updatedSubstitutes;
        } else if (playerIn.position === 'MID' && canSubstitute(state.startingForwards, 1)) {
          // Move midfielder to startingMidfielders and ensure at least 1 forward
          const { updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes } = swapPlayersInPosition(state.startingMidfielders, state.startingForwards, state.substitutes);
          state.startingMidfielders = updatedIncomingArray;
          state.startingForwards = updatedOutgoingArray;
          state.substitutes = updatedSubstitutes;
        } else if (playerIn.position === 'DEF' && canSubstitute(state.startingForwards, 1)) {
          const { updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes } = swapPlayersInPosition(state.startingDefenders, state.startingForwards, state.substitutes);
          state.startingDefenders = updatedIncomingArray;
          state.startingForwards = updatedOutgoingArray;
          state.substitutes = updatedSubstitutes;
        }
      } else if (playerOut.position === 'MID') {
        if (playerIn.position === 'MID') {
          // Swap midfielder for midfielder
          const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingMidfielders, state.substitutes);
          state.startingMidfielders = updatedStarting;
          state.substitutes = updatedSubstitutes;
        } else if (playerIn.position === 'FWD' && canSubstitute(state.startingMidfielders, 3)) {
          const { updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes } = swapPlayersInPosition(state.startingForwards, state.startingMidfielders, state.substitutes);
          state.startingForwards = updatedIncomingArray;
          state.startingMidfielders = updatedOutgoingArray;
          state.substitutes = updatedSubstitutes;
        } else if (playerIn.position === 'DEF' && canSubstitute(state.startingMidfielders, 3)) {
          // Move defender to startingDefenders and ensure at least 3 midfielders
          const { updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes } = swapPlayersInPosition(state.startingDefenders, state.startingMidfielders, state.substitutes);
          state.startingDefenders = updatedIncomingArray;
          state.startingMidfielders = updatedOutgoingArray;
          state.substitutes = updatedSubstitutes;
        }
      } else if (playerOut.position === 'DEF') {
        if (playerIn.position === 'DEF') {
          // Swap defender for defender
          const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingDefenders, state.substitutes);
          state.startingDefenders = updatedStarting;
          state.substitutes = updatedSubstitutes;
        } else if (playerIn.position === 'FWD' && canSubstitute(state.startingDefenders, 3)) {
          // Move forward to startingForwards and ensure at least 3 defenders
          const { updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes } = swapPlayersInPosition(state.startingForwards, state.startingDefenders, state.substitutes);
          state.startingForwards = updatedIncomingArray;
          state.startingDefenders = updatedOutgoingArray;
          state.substitutes = updatedSubstitutes;
        } else if (playerIn.position === 'MID' && canSubstitute(state.startingDefenders, 3)) {
          // Move midfielder to startingMidfielders and ensure at least 3 defenders
          const { updatedOutgoingArray, updatedIncomingArray, updatedSubstitutes } = swapPlayersInPosition(state.startingMidfielders, state.startingDefenders, state.substitutes);
          state.startingMidfielders = updatedIncomingArray;
          state.startingDefenders = updatedOutgoingArray;
          state.substitutes = updatedSubstitutes;
        }
      } else if (playerOut.position === 'GK') {
        // Swap goalkeeper for goalkeeper
        const { updatedStarting, updatedSubstitutes } = swapPlayers(state.startingGk, state.substitutes);
        state.startingGk = updatedStarting;
        state.substitutes = updatedSubstitutes;
      }
    },
  }
});

export const { addPlayer, makeCaptain, removePlayer, squadReset, addSubstitute, initializeSquad } = playerSelectSlice.actions;

export default playerSelectSlice.reducer;
