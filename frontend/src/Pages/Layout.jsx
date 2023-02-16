import {Outlet, useNavigate} from "react-router-dom";
import {isUserSignedIn} from "../Tools/userTools";
import "./Layout.css"
import Button from "@mui/material/Button"
import {AppBar, Toolbar, Typography} from "@mui/material";


export default function Layout() {
    const navigate = useNavigate();

    return <>
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography variant="h4" color="inherit" noWrap
                            sx={{flexGrow: 1, cursor: "pointer", userSelect: "none"}} onClick={() => navigate("/")}>
                    Quiz.io
                </Typography>
                {isUserSignedIn() ?
                    <>
                        <nav>
                            <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}}>
                                Profile
                            </Button>
                            <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}} onClick={() => navigate("/")}>
                                Sign out
                            </Button>
                        </nav>
                    </>
                    :
                    <>
                        <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}} onClick={() => navigate("/")}>
                            Login
                        </Button>
                        <Button href="#" color="secondary" variant="outlined" sx={{my: 1, mx: 1.5}}
                                onClick={() => navigate("/")}>
                            Sign up
                        </Button>
                    </>
                }
            </Toolbar>
        </AppBar>
        <Outlet/>
    </>
}