import {
    Button,
    TextField
} from "@mui/material";
import {Container} from "@mui/system";
import {useNavigate} from "react-router-dom";


export default function SearchMultiGamePage() {
    const navigate = useNavigate();

    return <>
        <Container align="center" sx={{padding: "5rem"}}>
            <TextField sx={{width: '30rem'}} id="outlined-basic" label="Game search" variant="outlined"
                       placeholder="Search game by game id, player name or email "/>
        </Container>
        <Container align="center" sx={{padding: "4rem"}}>
            <Button variant="contained" size="large" sx={{margin: "4rem", padding: "2rem"}} onClick={() => {
                navigate("/question-multi");}
            }>
                Search game
            </Button>
        </Container>
    </>
}
