import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaySound, tick } from "../redux/timerSlice";

function Timer ({ sound }) {
    /*
    This timer component sets a clock that ticks every second. 
    It also takes care of the alarm sound when the timer reaches zero.
    This component handles audio because I only want to allocate resources for the audio once.
    Instantiating the alarm sound is slow and I couldn't find a way to make the sound trigger instantly 
    without redux complaining. For now, this will do.
    */

    const dispatch = useDispatch();
    const [alarm] = useState(new Audio(sound));
    const { playSound, paused } = useSelector((state) => state.timer);
    
    // Sets a timer that ticks when state is not paused.
    useEffect(() => {
        const interval = setInterval(() => {
          if (!paused) {
            dispatch(tick());
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [dispatch, paused]);
    
    // When the timer reaches zero, the alarm will play
    useEffect(() => {
        if (playSound){
            alarm.play();
            dispatch(setPlaySound(false));
        }
    }, [dispatch, alarm, playSound]);

    return (
        <></>
    );
}

export default Timer;