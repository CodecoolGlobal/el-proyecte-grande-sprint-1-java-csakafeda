import "../Layout.css";
import { getPlayerId } from "../../Tools/userTools";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
const baseUrl = "/api/player";
import Collapse from "@mui/material/Collapse";

export default function Profile() {
  async function getPlayerData() {
    const playerId = getPlayerId();
    const res = await fetch(`${baseUrl}?playerId=${playerId}`);
    const playerData = await res.json();
    return playerData;
  }

  const [player, setPlayer] = useState({});

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
          <List>
            <ListItem key={"PlayerId" + player.id}>
              <ListItemText primary={player.id} secondary="Player Id" />
            </ListItem>
            <ListItem key={"PlayerName" + player.name}>
              <ListItemText primary={player.name} secondary="Player name" />
            </ListItem>
            <ListItem key={"PlayerEmail" + player.email}>
              <ListItemText primary={player.email} secondary="Player e-mail" />
            </ListItem>
            <ListItemButton
              onClick={handleClick}
              key={"CreatedGames" + player.id}
            >
              <ListItemText primary="Created games" />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {player.createdGames.map((game) => (
                  <div key={"Container for game id" + game.id}>
                    <ListItemButton sx={{ pl: 4 }} key={"GameId" + game.id}>
                      <ListItemText primary={game.id} secondary="Game Id" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={
                        game.difficulty === null
                          ? "Mixed" + game.id
                          : game.difficulty + game.id
                      }
                    >
                      <ListItemText
                        primary={
                          game.difficulty === null ? "Mixed" : game.difficulty
                        }
                        secondary="Game difficulty"
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={
                        game.categories.length === 0
                          ? "All" + game.id
                          : game.categories + game.id
                      }
                    >
                      <ListItemText
                        primary={
                          game.categories.length === 0 ? "All" : game.categories
                        }
                        secondary="Game categories"
                      />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} key={"Todo" + game.id}>
                      <ListItemText
                        primary="{game.created}"
                        secondary="Game created"
                      />
                    </ListItemButton>
                  </div>
                ))}
              </List>
            </Collapse>
          </List>
        </>
      )}
    </>
  );
}
