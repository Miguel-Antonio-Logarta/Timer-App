import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimer, skipTimer, switchTimer } from "../redux/timerSlice";
import { convertToHMSString } from "../other/utilities";
import { POMODORO, SHORT_BREAK, LONG_BREAK } from "../other/constants";

function TimerController() {
    const { 
        currentTime, 
        pomodoro, 
        shortBreak, 
        longBreak, 
        paused, 
        currentIntervalName 
    } = useSelector((state) => state.timer);
    const timerDisplay = convertToHMSString(currentTime);
    const dispatch = useDispatch();

    return(
        <div className="timer">
                <div className="timer-selection">
                    <button 
                        className={`timer-button ${currentIntervalName === POMODORO && "active-interval"}`} 
                        onClick={() => dispatch(setTimer({time: pomodoro, intervalName: POMODORO}))}
                    >Pomodoro</button>
                    <button 
                        className={`timer-button ${currentIntervalName === SHORT_BREAK && "active-interval"}`} 
                        onClick={() => dispatch(setTimer({time: shortBreak, intervalName: SHORT_BREAK}))}
                    >Short Break</button>
                    <button 
                        className={`timer-button ${currentIntervalName === LONG_BREAK && "active-interval"}`} 
                        onClick={() => dispatch(setTimer({time: longBreak, intervalName: LONG_BREAK}))}
                    >Long Break</button>
                </div>
                <div className="timer-display">
                    {timerDisplay}
                </div>
                <div className="timer-control">
                    <button className="timer-pause-play timer-button" onClick={() => dispatch(switchTimer())}>{paused ? "Play" : "Pause"}</button>
                    <button className={`timer-skip timer-button ${paused && "hidden"}`} onClick={() => dispatch(skipTimer())}>Skip</button>
                </div>
            </div>
    );
}

export default TimerController;