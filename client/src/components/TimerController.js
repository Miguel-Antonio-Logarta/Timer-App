import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import { setTimer, skipTimer, switchTimer } from "../redux/timerSlice";

// TODOS:
// The button should be highlighted when active. For example, when it is pomodoro time, the pomodoro button is white

function TimerController() {
    const { pomodoro, shortBreak, longBreak, paused } = useSelector((state) => state.timer);
    const dispatch = useDispatch();

    return(
        <div className="timer">
                <div className="timer-selection">
                    <button className="timer-button" onClick={() => dispatch(setTimer(pomodoro))}>Pomodoro</button>
                    <button className="timer-button" onClick={() => dispatch(setTimer(shortBreak))}>Short Break</button>
                    <button className="timer-button" onClick={() => dispatch(setTimer(longBreak))}>Long Break</button>
                </div>
                <Timer className="timer-display" />
                <div className="timer-control">
                    <button className="timer-pause-play timer-button" onClick={() => dispatch(switchTimer())}>{paused ? "Play" : "Pause"}</button>
                    <button className="timer-skip timer-button" onClick={() => dispatch(skipTimer())}>Skip</button>
                </div>
            </div>
    );
}

export default TimerController;