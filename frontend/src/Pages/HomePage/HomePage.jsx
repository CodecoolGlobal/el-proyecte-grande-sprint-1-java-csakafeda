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
import {Container} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


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
    const [URL, setURL] = useState("");

    const categories = [
        "all",
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
    const handleCategoryChange = (event) => {
        const {target: {value}} = event;
        setChosenCategory(typeof value === 'string' ? value.split(',') : value);
        console.log(value);
    };

    const handleDifficultyChange = (event) => {
        console.log((event.target.value).toUpperCase());
        setDifficulty((event.target.value));
    };

    const getCategoryAndDifficultySearchParam = (e) => {
        console.log(difficulty);
        console.log(chosenCategory.length)

        if ((difficulty !== "" && chosenCategory.length !== 0) || (difficulty !== "all" && chosenCategory[0] !== "all")) {
            return `?difficulty=${difficulty.toUpperCase()}&category=${chosenCategory[0].toUpperCase()}`;
        } else if (chosenCategory.length > 0 || chosenCategory[0] === "all") {
            return `?category=${chosenCategory[0].toUpperCase()}`;
        } else if (difficulty !== "" || difficulty !== "all") {
            return `?difficulty=${difficulty.toUpperCase()}`;
        } else {
            return"";
        }
    }

    return <>
        <Container align="center" sx={{padding: "5rem"}}>
            <FormControl sx={{m: 1, minWidth: 200}}>
                <InputLabel id="difficulty-choosing">
                    Difficulty
                </InputLabel>
                <Select
                    labelId="difficulty-choosing"
                    id="difficulty"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="categories">Categories</InputLabel>
                <Select
                    labelId="categories"
                    id="categories"
                    multiple
                    value={chosenCategory}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput id="select-multiple-category" label="categories"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {categories.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, chosenCategory, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>

        <Container align="center" sx={{padding: "4rem"}}>
            <Button variant="contained" size="large" onClick={(e) => {
                setURL(getCategoryAndDifficultySearchParam(e));
                console.log(getCategoryAndDifficultySearchParam());
                navigate({
                    pathname: "/question-single",
                    search: getCategoryAndDifficultySearchParam()
                });
            }
            }>
                Single player game
            </Button>
            <Button variant="contained" size="large" gameid={gameId} onClick={(e) => {
                getCategoryAndDifficultySearchParam(e).then((r) => {
                    setGameId(r);
                    navigate("question-multi/");
                });
            }
            }>
                Multiplayer game
            </Button>
        </Container>
    </>
}
