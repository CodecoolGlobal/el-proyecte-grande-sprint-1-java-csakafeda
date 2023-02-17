export const isUserSignedIn = () => localStorage.getItem("playerId") === null;
export const getUserName = () => "Csincsilla";
export const getPlayerId = () => localStorage.getItem("playerId");
export const setPlayerId = (playerId) => localStorage.setItem("playerId", playerId)
