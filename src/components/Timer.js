import React, { useEffect } from "react";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {tick, setTimer, flipOnOff, skip} from "../state/index";

// TODOS:
// Add sound effect for when timer reaches zero, when timer pauses, when timer plays
// Pass down settings
function Timer(props) {
    const time = useSelector((state) => state.Timer);
    const dispatch = useDispatch();

    // Begin a timer once it is mounted.
    // setInterval will clear once it has been unmounted.
    // Instead of dispatching a tick, we should do something else instead.
    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(tick());
        }, 1000);
        return () => clearInterval(interval);
      }, [dispatch]);
    
    return(
        <div className="timer">
                <div className="timer-selection">
                    <button className="timer-button" onClick={() => dispatch(setTimer(time.pomodoro))}>Pomodoro</button>
                    <button className="timer-button" onClick={() => dispatch(setTimer(time.short_break))}>Short Break</button>
                    <button className="timer-button" onClick={() => dispatch(setTimer(time.long_break))}>Long Break</button>
                </div>
                <div className="timer-display">{moment.utc(time.currentTime.asMilliseconds()).format("mm:ss")}</div>
                <div className="timer-control">
                    <button className="timer-pause-play timer-button" onClick={() => dispatch(flipOnOff())}>Play</button>
                    <button className="timer-skip timer-button" onClick={() => dispatch(skip())}>Skip</button>
                </div>
            </div>
    );
}

export default Timer;