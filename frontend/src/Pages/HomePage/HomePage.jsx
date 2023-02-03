import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return <>
        <Container align="center" sx={{ padding: "4rem" }}>
            <Button variant="contained" size="large" onClick={() => navigate("question/")} >Start game</Button>
        </Container>
    </>
}
