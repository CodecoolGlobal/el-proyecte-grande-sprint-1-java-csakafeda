export const isUserSignedIn = () => localStorage.getItem("playerId") !== null;
export const getUserName = () => "Csincsilla";
export const getPlayerId = () => localStorage.getItem("playerId");
export const setPlayerId = (playerId) => localStorage.setItem("playerId", JSON.stringify(playerId))
export const signUserOut = () => localStorage.removeItem("playerId");
export const setToken = (token) => localStorage.setItem("token", token);
