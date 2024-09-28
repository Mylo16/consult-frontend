export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('squadState');
    if (serializedState === null) {
      return undefined; // State not found, Redux will use default state
    }
    return JSON.parse(serializedState); // Parse the saved state from localStorage
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('squadState', serializedState); // Save Redux state to localStorage
  } catch (error) {
    console.error("Could not save state", error);
  }
};
