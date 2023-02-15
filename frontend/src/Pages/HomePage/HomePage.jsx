import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Container} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function HomePage() {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");

    const handleDifficultyChange = (event) => {
        console.log(event.target.value);
        setDifficulty(event.target.value);
    };

    const handleCategoryChange = (event) => {
        console.log(event.target.value);
        setCategory(event.target.value);
    };

    const handleGameStart = () => {
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

            <FormControl sx={{m: 1, minWidth: 200}}>
                <InputLabel id="category-choosing">
                    Category
                </InputLabel>
                <Select
                    labelId="category-choosing"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={"arts"}>Art</MenuItem>
                    <MenuItem value={"food&drink"}>Food & Drink</MenuItem>
                    <MenuItem value={"general"}>General Knowledge</MenuItem>
                    <MenuItem value={"geography"}>Geography</MenuItem>
                    <MenuItem value={"history"}>History</MenuItem>
                    <MenuItem value={"movies"}>Movies</MenuItem>
                    <MenuItem value={"music"}>Music</MenuItem>
                    <MenuItem value={"science"}>Science</MenuItem>
                    <MenuItem value={"society"}>Society</MenuItem>
                    <MenuItem value={"sport"}>Sport</MenuItem>
                </Select>
            </FormControl>
        </Container>

        <Container align="center" sx={{padding: "4rem"}}>
            <Button variant="contained" size="large" onClick={() => navigate("question-single/")}>Single player
                game</Button>
            <Button variant="contained" size="large" onClick={() => navigate("question-multi/")}>Multiplayer
                game</Button>
        </Container>
    </>
}
