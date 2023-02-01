import { Typography } from "@mui/material";
import Countdown from "react-countdown";

export default function Counter({time, onTick, onComplete}) {

    return <Typography align="center">
    <div className="counter">
        <Countdown date={Date.now() + time} onTick={onTick} onComplete={onComplete} renderer={props => <div>{props.total / 1000}</div>} autoStart />
    </div>
</Typography>
}