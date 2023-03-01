import "../Layout.css";
import { getPlayerId, getPlayerName } from "../../Tools/userTools";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
const baseUrl = "/api/player";
import Collapse from "@mui/material/Collapse";
import { Stack } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

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

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getPlayerData().then((response) => {
      setPlayer(response);
      setLoading(false);
    });
  }, []);

  function getStartingCharacterFromPlayerName() {
    return player.name.charAt(0).toUpperCase();
  }

  return (
    <>
      {loading ? (
        <>
          <p>Loading gecc!</p>
        </>
      ) : (
        <>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Avatar
              src="https://images.unsplash.com/photo-1558730234-d8b2281b0d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbiUyMGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8&w=1000&q=80"
              // If we create field in the database for player avatar image link we can use that here like "player.avatar" :)
              sx={{
                height: "12rem",
                width: "12rem",
                fontSize: "5rem",
                backgroundColor: "salmon",
                color: "antiquewhite",
                marginTop: "2rem",
                my: 4,
              }}
            >
              {getStartingCharacterFromPlayerName()}
              {/* if no avatar link in the database we can use the starting
              character of player name */}
            </Avatar>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              sx={{
                userSelect: "none",
                color: "antiquewhite",
                my: 1.5,
                height: "2rem",
              }}
            >
              Your userID: {player.id}
            </Typography>
            <Stack direction="row" justifyContent="center">
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                sx={{
                  userSelect: "none",
                  color: "antiquewhite",
                  my: 1.5,
                  height: "2rem",
                }}
              >
                Username: {player.name}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mx: 1.5, my: 1.5, height: "2rem" }}
                onClick={() => {
                  navigate("");
                }}
              >
                Edit
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                sx={{ userSelect: "none", color: "antiquewhite", my: 1.5 }}
              >
                Registered e-mail: {player.email}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mx: 1.5, my: 1.5 }}
                onClick={() => {
                  navigate("");
                }}
              >
                Edit
              </Button>
            </Stack>
            <Button
              endIcon={!open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              onClick={handleClick}
              variant="outlined"
              sx={{ mx: 1.5, my: 1.5 }}
            >
              Created Games
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Stack direction="column" justifyContent="center">
                {player.createdGames.map((game) => (
                  <div key={game.id}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography
                        alignItems="center"
                        variant="h7"
                        color="inherit"
                        noWrap
                        sx={{
                          userSelect: "none",
                          color: "antiquewhite",
                          my: 1.5,
                          mx: 1.5,
                          height: "2rem",
                        }}
                      >
                        Game ID: {game.id}
                      </Typography>
                      <Divider
                        orientation="vertical"
                        sx={{ height: "2rem", alignSelf: "center" }}
                      />{" "}
                      <Typography
                        variant="h7"
                        color="inherit"
                        noWrap
                        sx={{
                          userSelect: "none",
                          color: "antiquewhite",
                          my: 1.5,
                          mx: 1.5,
                          height: "2rem",
                        }}
                      >
                        Difficulty:{" "}
                        {game.difficulty === null ? "Mixed" : game.difficulty}
                      </Typography>
                      <Divider
                        orientation="vertical"
                        sx={{ height: "2rem", alignSelf: "center" }}
                      />{" "}
                      <Typography
                        variant="h7"
                        color="inherit"
                        noWrap
                        sx={{
                          userSelect: "none",
                          color: "antiquewhite",
                          my: 1.5,
                          mx: 1.5,
                          height: "2rem",
                        }}
                      >
                        Categories:{" "}
                        {game.categories.length === 0 ? "All" : game.categories}
                      </Typography>
                      <Divider
                        orientation="vertical"
                        sx={{ height: "2rem", alignSelf: "center" }}
                      />{" "}
                      <Typography
                        variant="h7"
                        color="inherit"
                        noWrap
                        sx={{
                          userSelect: "none",
                          color: "antiquewhite",
                          my: 1.5,
                          mx: 1.5,
                          height: "2rem",
                        }}
                      >
                        Game created: !TODO!
                      </Typography>
                      <Divider
                        orientation="vertical"
                        sx={{ height: "2rem", alignSelf: "center" }}
                      />
                      <Button
                        endIcon={<QuizIcon />}
                        variant="outlined"
                        sx={{ mx: 1.5, my: 1.5, height: "2rem", width: "5rem" }}
                        onClick={() => navigate("/question-multi/" + game.id)}
                      >
                        Play
                      </Button>
                    </Stack>
                  </div>
                ))}
              </Stack>
            </Collapse>
          </Stack>
        </>
      )}
    </>
  );
}
