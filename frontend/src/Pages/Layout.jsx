import { Outlet } from "react-router-dom";
import { getUserName, isUserSignedIn } from "../Tools/userTools";
import "./Layout.css"
import Button from "@mui/material/Button"


export default function Layout() {

    return <>
        <header>
            <div>Quiz.io</div>
            {isUserSignedIn() ?
                <>
                    <div>{getUserName()}</div>
                    <div>Statistics</div>
                </>
                :
                <>
                    <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                    <Button href="#" color="secondary" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                        Sign up
                    </Button>
                </>
            }
        </header>
        <Outlet />
    </>
}