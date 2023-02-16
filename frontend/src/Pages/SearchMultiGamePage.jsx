import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";

export default function SearchMultiGamePage() {
    const [search, setSearch] = useState("");
    const [games, setGames] = useState(null);

    const fetchGames = async () => {
        const res = await fetch(`/api/loadgame?name=${search}`)
        const data = await res.json();
        console.log(data);
        return data;
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }

    return <>
        <Container align="center" sx={{padding: "5rem"}}>
            <TextField sx={{width: '30rem'}}
                       id="outlined-basic"
                       label="Game search"
                       variant="outlined"
                       placeholder="Search game by player name"
                       onChange={handleSearch}
            />
        </Container>
        <Container align="center" sx={{padding: "4rem"}}>
            <Button variant="contained"
                    size="large"
                    sx={{margin: "4rem", padding: "2rem"}}
                    onClick={() => {
                        fetchGames(search).then((res) => {
                                setGames(res);
                            }
                        );
                    }
                    }>
                Search players games
            </Button>
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
                                                size="large"
                                                sx={{margin: "2rem", padding: "1rem"}}>Start this game!</Button>
                                    </TableRow>
                                )
                            )
                            :
                            <div></div>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </>
}
