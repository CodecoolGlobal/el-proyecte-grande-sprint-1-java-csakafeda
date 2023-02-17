import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const entries = [...formData.entries()]
        const formObject = entries.reduce((prev, entry) => {
            const [key, value] = entry;
            prev[key] = value;
            return prev;
        }, {});
        console.log(formObject);
        if (formObject.username === "" || formObject.password === "") {
            setErrorMessage("You have to provide a username and a password.")
            return;
        }
        fetch("/api/player-id", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": formObject?.username,
                "email": "",
                "password": formObject?.password
              })
        }).then(res => {
            if (res.status === 203) {
                setErrorMessage("Password is incorrect.")
            }
        })
    }

    return <Container maxWidth={"sm"} sx={{marginBlock: 2}}>
        <Box onSubmit={handleSubmit} component={"form"}>
        <Stack gap={2}>
            <Typography variant={"h4"} align="center">Log In</Typography>
            <TextField variant={"outlined"} name={"username"} label="Username"></TextField>
            <TextField variant={"outlined"} name={"password"} label="Password" type={"password"}></TextField>
            <Stack direction={"row"} gap={2}>
                <Button variant={"contained"} color={"primary"} sx={{flexGrow: 1}} type="submit">Submit</Button>
                <Button variant={"contained"} color={"secondary"} onClick={() => navigate("/signup")}>Sign up instead</Button>
            </Stack>
            <Typography variant={"body1"} align="center">{errorMessage}</Typography>
        </Stack>

        </Box>
    </Container>
}