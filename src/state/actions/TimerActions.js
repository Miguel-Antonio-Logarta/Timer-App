// Start timer dispatches an action that will start ticking the clock.
export const setTimer = (duration) => {
    return (dispatch) => {
        dispatch({
            type: "SET_TIMER",
            payload: duration
        })
    }
}

export const tick = () => {
    return (dispatch) => {
        dispatch({
            type: "TICK"
        })
    }
}

export const flipOnOff = () => {
    return (dispatch)=> {
        dispatch({
            type: "FLIP_TIMER"
        })
    }
}

export const skip = () => {
    return (dispatch)=> {
        dispatch({
            type: "SKIP_TIMER"
        })
    }
}