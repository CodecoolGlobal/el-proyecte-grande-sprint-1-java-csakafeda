import {
    Box,
    Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField
} from "@mui/material";

import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Category, Difficulty } from "../../Tools/staticObjects";
import GamesTable from "./GamesTable";



export default function SearchMultiGamePage() {
    const [games, setGames] = useState(null);
    const [searchCategories, setSearchCategories] = useState([]);
    const [searchDifficulty, setSearchDifficulty] = useState("");

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
                            {Object.values(Difficulty).map(difficulty => <MenuItem key={difficulty.enum} value={difficulty.enum}>{difficulty.stringValue}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1, maxWidth: 400 }}>
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
                            }}
                        >
                            {Object.values(Category).map((category, i) => <MenuItem key={category.stringValue} value={category.stringValue}>
                                <Checkbox checked={searchCategories.indexOf(category.stringValue) > -1} />
                                <ListItemText primary={category.stringValue} />
                            </MenuItem>)}
                        </Select>
                    </FormControl>
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
        <GamesTable games={games} />
    </>
}
