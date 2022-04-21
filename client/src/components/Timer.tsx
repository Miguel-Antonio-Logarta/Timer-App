import React from "react";
import { convertToHMSString } from "../other/utilities";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import {
	setTimer,
	skipTimer,
	startTimer,
	stopTimer,
} from "../state/slice/timerSlice";
import { intervalNames } from "../other/types";

const Timer: React.FC = () => {
	const dispatch = useAppDispatch();
	const { remainingTime, paused, currentInterval } = useAppSelector((state) => state.timer);
	const timeString: string = convertToHMSString(remainingTime);

	const handlePausePlay = () => {
		if (paused) {
			dispatch(startTimer(1000));
		} else {
			dispatch(stopTimer());
		}
	};
  
	const isCurrentInterval = (interval: intervalNames): boolean => {
		return interval === currentInterval;
	}

	return (
		<div className="timer">
			<button className={isCurrentInterval(intervalNames.POMODORO) ? "active-button" : ""} onClick={() => dispatch(setTimer(intervalNames.POMODORO))}>
				Pomodoro
			</button>
			<button className={isCurrentInterval(intervalNames.SHORTBREAK) ? "active-button" : ""} onClick={() => dispatch(setTimer(intervalNames.SHORTBREAK))}>
				Short Break
			</button>
			<button className={isCurrentInterval(intervalNames.LONGBREAK) ? "active-button" : ""} onClick={() => dispatch(setTimer(intervalNames.LONGBREAK))}>
				Long Break
			</button>

			<p className="timer-display">{timeString}</p>

			<button
				className={paused ? "pause-play-full" : ""}
				onClick={handlePausePlay}
			>
				{paused ? "Play" : "Pause"}
			</button>
			<button
				className={paused ? "hidden" : ""}
				onClick={() => {
					dispatch(skipTimer());
				}}
			>
				Skip
			</button>
		</div>
	);
};

export default Timer;
