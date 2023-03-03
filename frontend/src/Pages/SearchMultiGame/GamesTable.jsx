import { Box, Button, Collapse, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { Category, Difficulty } from "../../Tools/staticObjects";
import { useNavigate } from "react-router-dom";

export default function GamesTable({ games }) {
    const navigate = useNavigate();

    const formattedDateStringFromISOString = isoString => {
        if (!isoString) return "-";
        return new Date(isoString).toLocaleDateString();
    }

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
                <TableCell>{game.difficulty ? Difficulty[game.difficulty].stringValue : <i>any</i>}</TableCell>
                <TableCell sx={{ maxWidth: "10rem" }}>{game.categories.length ? game.categories.map(category => Category[category].stringValue).join(", ") : <i>any</i>}</TableCell>
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
                                    {game.scores.sort((a, b) => b.score - a.score).map((scoreObject, i) => <TableRow key={`scoreboard row ${i}`}>
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

    return <Container align="center" sx={{ padding: "2rem" }}>
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
}