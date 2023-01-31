import { Outlet } from "react-router-dom";
import { getUserName, isUserSignedIn } from "../Tools/userTools";
import "./Layout.css"


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
                    <div>Sign in</div>
                    <div>Register</div>
                </>
            }
        </header>
        <Outlet />
    </>
}