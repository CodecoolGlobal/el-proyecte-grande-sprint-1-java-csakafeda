import "../Layout.css";
import { getPlayerId } from "../../Tools/userTools";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
const baseUrl = "/api/player";

export default function Profile() {
  async function getPlayerData() {
    const playerId = getPlayerId();
    const res = await fetch(`${baseUrl}?playerId=${playerId}`);
    const playerData = await res.json();
    return playerData;
  }

  const [player, setPlayer] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayerData().then((response) => {
      setPlayer(response);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <>
          <p>Loading gecc!</p>
        </>
      ) : (
        <>
          {console.log(player)}
          <Typography>Player id: {player.id}</Typography>
          <Typography>Player name: {player.name}</Typography>
          <Typography>Player e-mail: {player.email}</Typography>
          <Typography>
            Created games by Id:{" "}
            {player.createdGames.map((game) => (
              <>
                <Typography>Game id: {game.id}</Typography>
                <Typography>
                  Game difficulty:{" "}
                  {game.difficulty === null ? "Mixed" : game.difficulty}
                </Typography>
                <Typography>
                  Game categories:{" "}
                  {game.categories.length === 0 ? "All" : game.categories}
                </Typography>
                <Typography>Game created: "TODO HERE"</Typography>
              </>
            ))}
          </Typography>
        </>
      )}
    </>
  );
}
