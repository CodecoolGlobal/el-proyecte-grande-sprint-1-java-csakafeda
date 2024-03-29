import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../Tools/userTools.js";

export default function LogIn() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];
        const formObject = entries.reduce((prev, entry) => {
            const [key, value] = entry;
            prev[key] = value;
            return prev;
        }, {});
        if (formObject.username === "" || formObject.password === "") {
            setErrorMessage("You have to provide a username and a password.");
            return;
        }
        login(formObject?.username, formObject?.password, message => setErrorMessage(message), nav => navigate(nav));
    };

    return (
        <Container maxWidth={"sm"} sx={{marginBlock: 2}}>
            <Box onSubmit={handleSubmit} component={"form"}>
                <Stack gap={2}>
                    <Typography component="span" variant="h4" align="center">
                        Log In
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        name={"username"}
                        label="Username"
                    ></TextField>
                    <TextField
                        variant={"outlined"}
                        name={"password"}
                        label="Password"
                        type={"password"}
                    ></TextField>
                    <Stack direction={"row"} gap={2}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            sx={{flexGrow: 1}}
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => navigate("/signup")}
                        >
                            Sign up instead
                        </Button>
                    </Stack>
                    <Typography component="span" variant="body1" align="center">
                        {errorMessage}
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
}
