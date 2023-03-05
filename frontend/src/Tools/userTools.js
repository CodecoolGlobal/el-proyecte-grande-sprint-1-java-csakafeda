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

export const login = (username, password, setMessage, setNavigate) => {
    fetch(`/api/player/login?username=${username}&password=${password}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }).then((res) => {
        if (res.status === 203) {
            setMessage("Password is incorrect.");
        }
        if (res.status === 404) {
            setMessage("Username not found.");
        }
        if (res.status === 200) {
            res.json().then((data) => {
                setPlayerId(data.id);
                setPlayerName(data.name);
                setNavigate("/");
            });
        }
    });
}

export const signup = (name, email, password, setMessage, setNavigate) => {
    fetch("/api/player", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, password
        })
    })
        .then(res => {
            if (res.status === 200) {
                res.json().then(() => {
                    login(name, password, setMessage, setNavigate);
                })
            }
        })
}
