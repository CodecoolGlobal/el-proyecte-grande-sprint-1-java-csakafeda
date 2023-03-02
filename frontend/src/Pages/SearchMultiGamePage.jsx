import {
    Box,
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formattedDateStringFromISOString = isoString => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString();
}

export default function SearchMultiGamePage() {
    const [games, setGames] = useState(null);
    const navigate = useNavigate();

    const fetchGames = async (name) => {
        const res = await fetch(`/api/loadgame`)
        const data = await res.json();
        console.log(data);
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

    useEffect(() => {
        handleSearch("");
    }, []);

    const HighScoreCell = ({ highScoreObject }) => {
        return <div title={`by ${highScoreObject.playerName} @ ${highScoreObject.playedDateTime ? highScoreObject.playedDateTime : "somewhen"}`}>{highScoreObject.score ? highScoreObject.score : "-"}</div>
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
                            <TableCell align="left">Created at</TableCell>
                            <TableCell align="left">Created by</TableCell>
                            <TableCell align="left">High score</TableCell>
                            <TableCell align="left">Difficulty</TableCell>
                            <TableCell align="left">Categories</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games !== null ?
                            games.map(game => (
                                <TableRow key={game.id}>
                                    <TableCell>{formattedDateStringFromISOString(game.createdDateTime)}</TableCell>
                                    <TableCell>
                                        <Button variant={"text"} size="small" onClick={_e => alert(`In the future, i will redirect you to ${game.createdByName}'s page, whose id is ${game.createdById}`)}>
                                            {game.createdByName}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <HighScoreCell
                                            highScoreObject={game.scores
                                                .reduce((maxValueElement, currentElement) => currentElement.score > maxValueElement.score ? currentElement : maxValueElement, { score: null })
                                            }
                                        />

                                    </TableCell>
                                    <TableCell>{game.difficulty}</TableCell>
                                    <TableCell sx={{maxWidth: "10rem"}}>{game.categories.join(", ")}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                            align="right"
                                            size="small"
                                            sx={{ margin: "0.5rem", padding: "0.5rem" }}
                                            onClick={() => navigate("/question-multi/" + game.id)}
                                        >
                                            Start this game!
                                        </Button>
                                    </TableCell>
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
