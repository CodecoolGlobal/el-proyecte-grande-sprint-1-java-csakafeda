import { Typography } from "@mui/material";
import Countdown from "react-countdown";

export default function Counter({time, onTick, onComplete}) {
    const middleMouseEasterEgg = mouseDownEvent => (mouseDownEvent && mouseDownEvent.button == 1) ? onComplete() : null;

    return <Typography align="center">
    <div className="counter">
        <Countdown date={Date.now() + time} onTick={onTick} onComplete={onComplete} renderer={props => <div onMouseDown={middleMouseEasterEgg}>{props.total / 1000}</div>} autoStart />
    </div>
</Typography>
}