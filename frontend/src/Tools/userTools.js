import {redirect} from "react-router-dom";

export const isUserSignedIn = () => localStorage.getItem("playerId") !== null;
export const getPlayerName = () => localStorage.getItem("playerName");
export const getPlayerId = () => localStorage.getItem("playerId");
export const setPlayerId = (playerId) =>
  localStorage.setItem("playerId", JSON.stringify(playerId));
export const setPlayerName = (playerName) =>
  localStorage.setItem("playerName", playerName);
export const signUserOut = () => {
    localStorage.removeItem("playerId");
    redirect("/login");
}
