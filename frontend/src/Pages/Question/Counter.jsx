import {Typography} from "@mui/material";
import Countdown from "react-countdown";

export default function Counter({time, onTick, onComplete, isFinished}) {
    const middleMouseEasterEgg = mouseDownEvent => (mouseDownEvent && mouseDownEvent.button == 1) ? onComplete() : null;

    return (
        <Typography component="span" align="center">
            <div className="counter" onMouseDown={middleMouseEasterEgg}>
                {isFinished ?
                    <div className="stop"></div>
                    :
                    <Countdown date={Date.now() + time} onTick={onTick} onComplete={onComplete}
                               renderer={props => <span>{props.total / 1000}</span>} autoStart/>
                }
            </div>
        </Typography>
    )
}