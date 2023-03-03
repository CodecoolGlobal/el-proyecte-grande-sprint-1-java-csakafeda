import {
    Box,
    Button, Checkbox, Collapse, FormControl, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Difficulty } from "../Tools/staticObjects";

const formattedDateStringFromISOString = isoString => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString();
}

export default function SearchMultiGamePage() {
    const [games, setGames] = useState(null);
    const [searchCategories, setSearchCategories] = useState([]);
    const [searchDifficulty, setSearchDifficulty] = useState("");
    const navigate = useNavigate();

    const fetchGames = async (searchParams) => {
        const res = await fetch(`/api/loadgame?${searchParams.toString()}`)
        const data = await res.json();
        return data;
    }

    const handleSearch = async (form) => {
        try {
            Object.keys(form).forEach(key => { if (form[key].length === 0) delete form[key] })
            const mySearchParams = new URLSearchParams(form);
            const res = await fetchGames(mySearchParams);
            setGames(res);
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
        form.categories = searchCategories.map(searchCategory => Object.values(Category).find(category => category.stringValue === searchCategory).enum);
        handleSearch(form);
    }

    useEffect(() => {
        handleSearch("");
    }, []);

    const HighScoreCell = ({ highScoreObject }) => {
        return <div title={`by ${highScoreObject.playerName} @ ${highScoreObject.playedDateTime ? highScoreObject.playedDateTime : "somewhen"}`}>{highScoreObject.score ? highScoreObject.score : "-"}</div>
    }

    const GameRow = ({ game }) => {
        const [open, setOpen] = useState(false);

        return <>
            <TableRow key={game.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {!game.scores.length ? <></> : open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
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
                <TableCell>{Difficulty[game.difficulty]?.stringValue}</TableCell>
                <TableCell sx={{ maxWidth: "10rem" }}>{game.categories.map(category => Category[category].stringValue).join(", ")}</TableCell>
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
            <TableRow>
                <TableCell sx={{ paddingBlock: 0 }} colSpan={7}>
                    <Collapse in={open} timeout={"auto"} unmountOnExit >
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component={"div"}>
                                Scoreboard
                            </Typography>
                            <Table size="small" aria-label={"scoreboard"} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="2 rem">Position</TableCell>
                                        <TableCell>Points</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {game.scores.sort((a, b) => b.score - a.score).map((scoreObject, i) => <TableRow>
                                        <TableCell align="center">{i + 1}.</TableCell>
                                        <TableCell>{scoreObject.score}</TableCell>
                                        <TableCell><Button>{scoreObject.playerName}</Button></TableCell>
                                        <TableCell>{formattedDateStringFromISOString(scoreObject.playedDateTime)}</TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    }

    return <>
        <Container align="center" sx={{ padding: "2rem" }}>
            <Box component={"form"} onSubmit={e => handleFormSubmit(e)}>
                <Stack direction={"row"} gap={1}>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        name="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Search game by player name"
                    />
                    <FormControl sx={{ flexGrow: 1 }}>
                        <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty-select-label"
                            id="difficulty-select"
                            name="difficulty"
                            label="Difficuty"
                            value={searchDifficulty}
                            onChange={e => setSearchDifficulty(e.target.value)}
                        >
                            {Object.values(Difficulty).map(difficulty => <MenuItem value={difficulty.enum}>{difficulty.stringValue}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1, maxWidth: 300 }}>
                        <InputLabel id="category-select-label">Categories</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            multiple
                            name="categories"
                            value={searchCategories}
                            onChange={(e) => setSearchCategories(e.target.value)}
                            input={<OutlinedInput label="Categories" />}
                            renderValue={selected => selected.join(", ")}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                getContentAnchorEl: null,
                            }}
                        >
                            {Object.values(Category).map((category, i) => <MenuItem key={category.stringValue} value={category.stringValue}>
                                <Checkbox checked={searchCategories.indexOf(category.stringValue) > -1} />
                                <ListItemText primary={category.stringValue} />
                            </MenuItem>)}
                        </Select>
                    </FormControl>
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
                </Stack>
            </Box>
        </Container>
        <Container align="center" sx={{ padding: "0.5rem" }}>
        </Container>
        <Container align="center" sx={{ padding: "2rem" }}>
            <TableContainer align="center">
                <Table align="center">
                    <TableHead>
                        <TableRow>
                            <TableCell />
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
                            games.map(game => <GameRow game={game} key={game.id} />)
                            :
                            <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </>
}
