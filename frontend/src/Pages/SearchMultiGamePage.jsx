import {
    Box,
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchMultiGamePage() {
    const [games, setGames] = useState(null);
    const navigate = useNavigate();

    const fetchGames = async (name) => {
        const res = await fetch(`/api/loadgame?name=${name}`)
        const data = await res.json();
        return data;
    }

    const handleSearch = async (name) => {
        try {
            const res = await fetchGames(name);
            if (res.length > 0) {
                setGames(res);
            } else {
                alert("Dont have this player. Please provide full player name");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()]
        const form = entries.reduce((acc, curr) => {
            acc[curr[0]] = curr[1];
            return acc;
        }, {})
        console.log(form);
        handleSearch(form.name);
    }

    return <>
        <Container align="center" sx={{ padding: "2rem" }}>
            <Box component={"form"} onSubmit={e => handleFormSubmit(e)}>
                <TextField
                    sx={{ width: '20rem', marginRight: ".5rem" }}
                    name="name"
                    label="Name"
                    variant="outlined"
                    placeholder="Search game by player name"
                />
                {/* <TextField
                    sx={{ width: '20rem' }}
                    name="gameId"
                    label="Game Id"
                    variant="outlined"
                    placeholder="Search game by game id"
                /> */}
                <Button
                    variant="contained"
                    size="small"
                    sx={{ margin: "0 .5rem", padding: "1rem" }}
                    type={"submit"}>
                    Search games
                </Button>
            </Box>
        </Container>
        <Container align="center" sx={{ padding: "0.5rem" }}>
        </Container>
        <Container align="center" sx={{ padding: "2rem" }}>
            <TableContainer align="center">
                <Table align="center">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Game ID</TableCell>
                            <TableCell align="left">Game Difficulty</TableCell>
                            <TableCell align="left">High score</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games !== null ?
                            games.map(game => (
                                <TableRow key={game.id}>
                                    <TableCell>{game.id}</TableCell>
                                    <TableCell>{game.difficulty}</TableCell>
                                    <TableCell>{game.highscore}</TableCell>
                                    <Button variant="contained"
                                        align="right"
                                        size="small"
                                        sx={{ margin: "0.5rem", padding: "0.5rem" }}
                                        onClick={() => navigate("/question-multi/" + game.id)}
                                    >
                                        Start this game!
                                    </Button>
                                </TableRow>
                            )
                            )
                            :
                            <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </>
}
