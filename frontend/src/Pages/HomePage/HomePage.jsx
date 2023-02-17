import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    OutlinedInput,
    useTheme
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getPlayerId } from "../../Tools/userTools";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function HomePage() {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState("");
    const [gameId, setGameId] = useState(0);
    const theme = useTheme();
    const [chosenCategory, setChosenCategory] = useState([]);

    const categories = [
        "arts_and_literature",
        "food_and_drink",
        "general_knowledge",
        "geography",
        "history",
        "film_and_tv",
        "music",
        "science",
        "society_and_culture",
        "sport_and_leisure"
    ];
    const categoryToWriteOut =
        categories.map(category => category.charAt(0).toUpperCase()
            + category.slice(1).replace(/_/g, " "));
    const handleCategoryChange = (event) => {
        const { target: { value } } = event;
        setChosenCategory(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const getCategoryAndDifficultySearchParam = () => {
        if (difficulty !== "" && chosenCategory.length !== 0) {
            let str = `?difficulty=${difficulty.toUpperCase()}`;
            for (let category of chosenCategory) {
                str += `&category=${category.toUpperCase().replace(/ /g, "_")}`
            }
            return str;
        } else if (chosenCategory.length !== 0) {
            let str = `?category=${chosenCategory[0].toUpperCase().replace(/ /g, "_")}`;
            for (let i = 1; i < chosenCategory.length; i++) {
                str += `&category=${chosenCategory[i].toUpperCase().replace(/ /g, "_")}`
            }
            return str;
        } else if (difficulty !== "") {
            return `?difficulty=${difficulty.toUpperCase()}`;
        } else {
            return "";
        }
    }

    async function createNewGame(urlParams) {
        const baseUrl = "/api/newgame";
        const res = await fetch(`${baseUrl}?createdBy=${getPlayerId()}&${urlParams}`, {
            method: "POST"
        });
        return await res.json();
    }

    return <>
        <Container align="center" sx={{ padding: "2rem" }}>
            <Button variant="contained"
                size="large"
                sx={{ margin: "2rem", padding: "2rem" }}
                onClick={() => {
                    navigate("search-multi/")
                }
                }
            >
                Search existing games
            </Button>
        </Container>
        <Container align="center" sx={{ padding: "5rem" }}>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="difficulty-choosing">
                    Difficulty
                </InputLabel>
                <Select
                    labelId="difficulty-choosing"
                    id="difficulty"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                >
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="categories">Categories</InputLabel>
                <Select
                    labelId="categories"
                    id="categories"
                    multiple
                    value={chosenCategory}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput id="select-multiple-category" label="categories" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {categoryToWriteOut.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, categoryToWriteOut, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>

        <Container align="center" sx={{ padding: "4rem" }}>
            <Button variant="contained" size="large" sx={{ margin: "4rem", padding: "2rem" }} onClick={() => {
                navigate({
                    pathname: "/question-single",
                    search: getCategoryAndDifficultySearchParam()
                });
            }
            }>
                Single player game
            </Button>
            <Button variant="contained" size="large" sx={{ margin: "4rem", padding: "2rem" }} gameid={gameId}
                onClick={async () => {
                    const searchParams = getCategoryAndDifficultySearchParam();
                    const gameId = await createNewGame(searchParams);
                    navigate("/question-multi/" + gameId);
                }
                }>
                Multiplayer game
            </Button>
        </Container>
    </>
}
