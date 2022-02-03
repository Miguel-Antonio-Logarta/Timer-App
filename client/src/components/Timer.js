import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function Timer (props) {
    const { currentTime } = useSelector((state) => state.timer);
    const display = moment.duration(currentTime, 'milliseconds');

    return (
        <div className={`${props.className}`}>{moment.utc(display.asMilliseconds()).format("mm:ss")}</div>
    )
}

export default Timer;