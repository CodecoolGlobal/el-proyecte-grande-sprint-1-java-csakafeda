import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SearchMultiGamePage() {
    const [search, setSearch] = useState("");
    const [games, setGames] = useState(null);
    const navigate = useNavigate();

    const fetchGames = async () => {
        const res = await fetch(`/api/loadgame?name=${search}`)
        const data = await res.json();
        return data;
    }

    const handleSearch = async () => {
        try {
            const res = await fetchGames(search);
            if (res.length > 0) {
                setGames(res);
            } else {
                alert("Dont have this player. Please provide full player name");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleSearchTyping = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }

    return <>
        <Container align="center" sx={{padding: "2rem"}}>
            <TextField sx={{width: '30rem'}}
                       id="outlined-basic"
                       label="Game search"
                       variant="outlined"
                       placeholder="Search game by player name"
                       onChange={handleSearchTyping}
            />
        </Container>
        <Container align="center" sx={{padding: "0.5rem"}}>
            <Button variant="contained"
                    size="small"
                    sx={{margin: "0.5rem", padding: "1rem"}}
                    onClick={handleSearch}>
                Search players games
            </Button>
        </Container>
        <Container align="center" sx={{padding: "2rem"}}>
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
                                                sx={{margin: "0.5rem", padding: "0.5rem"}}
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
