import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const entries = [...formData.entries()]
        console.log(entries);
    }

    return <Container maxWidth={"sm"} sx={{marginBlock: 2}}>
        <Box onSubmit={handleSubmit} component={"form"}>
        <Stack gap={2}>
            <Typography variant={"h4"} align="center">Sign Up</Typography>
            <TextField variant={"outlined"} name={"Username"} label="Username"></TextField>
            <TextField variant={"outlined"} name={"Email"} label="Email"></TextField>
            <TextField variant={"outlined"} name={"Password"} label="Password" type={"password"}></TextField>
            <Stack direction={"row"} gap={2}>
                <Button variant={"contained"} color={"primary"} onClick={() => navigate("/login")}>Log in instead</Button>
                <Button variant={"contained"} color={"secondary"} sx={{flexGrow: 1}}>Submit</Button>
            </Stack>
        </Stack>

        </Box>
    </Container>
}