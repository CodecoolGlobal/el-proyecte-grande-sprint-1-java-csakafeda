import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setPlayerId, setPlayerName} from "../../Tools/userTools";

export default function SignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const handleFirstPasswordChange = e => {
        setFirstPassword(e.target.value);
    }

    const handleSecondPasswordChange = e => {
        setSecondPassword(e.target.value);
    }

    const login = (player) => {
        fetch(`/api/player/login?username=${player.name}&password=${player.password}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setPlayerId(data.id);
                    setPlayerName(data.name);
                    navigate("/");
                });
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];
        const formObject = entries.reduce((prev, entry) => {
            const [key, value] = entry;
            prev[key] = value;
            return prev;
        }, {});
        if (formObject.username === "" || formObject.password === "") {
            setErrorMessage("You have to provide a username and a password.")
            return;
        }
        if (firstPassword !== secondPassword) {
            setErrorMessage("The two password are not the same");
            return;
        }
        fetch("/api/player", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": formObject?.username,
                "email": formObject?.email,
                "password": formObject?.password
            })
        })
            .then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setPlayerId(data.id);
                    setPlayerName(data.name);
                    login(data);
                })
            }
        })
    }

    return <Container maxWidth={"sm"} sx={{marginBlock: 2}}>
        <Box onSubmit={handleSubmit} component={"form"}>
            <Stack gap={2}>
                <Typography variant={"h4"} align="center">Sign Up</Typography>
                <TextField variant={"outlined"} name={"username"} label="Username"></TextField>
                <TextField variant={"outlined"} name={"email"} label="Email"></TextField>
                <TextField variant={"outlined"}
                           name={"password"}
                           label="Password"
                           type={"password"}
                           onChange={handleFirstPasswordChange}
                >
                </TextField>
                <TextField variant={"outlined"}
                           name={"passwordToCheck"}
                           label="Password"
                           type={"password"}
                           onChange={handleSecondPasswordChange}
                >
                </TextField>
                <Stack direction={"row"} gap={2}>
                    <Button variant={"contained"} color={"primary"} onClick={() => navigate("/login")}>Log in
                        instead</Button>
                    <Button variant={"contained"} color={"secondary"} sx={{flexGrow: 1}} type="submit">Submit</Button>
                </Stack>
                <Typography variant={"body1"} align="center">{errorMessage}</Typography>
            </Stack>

        </Box>
    </Container>
}