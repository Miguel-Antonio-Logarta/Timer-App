import React from "react";
import moment from 'moment';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            buttonText: "Play",
            currentTime: moment.duration(25*60*1000), // Sets a 25 minutes counter in milliseconds
            // currentTime: moment.duration(10*1000)
        }

        this.handlePause = this.handlePause.bind(this);
    }

    componentDidMount() {
        console.log(this.state.currentTime)
        console.log(moment.utc(this.state.currentTime.asMilliseconds()).format("mm:ss"))

        this.timerID = setInterval(
            () => this.tick(),
            1000
          );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (!this.state.paused)
        {
            this.setState({currentTime: moment.duration(this.state.currentTime.asMilliseconds() - 1000)});
        }

        // Make sure to end the tick once duration reaches 0 and reset it.
    }

    handlePause(event) {
        // The button text is not working for some reason. The first play does not change
        // Reason: setState calls are asynchronous for performance reasons, relying on them for instand change will cause issues.
        // Issue fixed**: use {this.state.paused ? "Play" : "Pause"} in the button tag instead of having it be the value of this.state.buttonText
        const isPaused = this.state.paused;
        if (isPaused) {
            // The timer is paused, the button should say play
            this.setState({buttonText: "Play", paused: false});
            console.log("Play");
            console.log(this.state);
        }
        else {
            // The timer is playing, the button should say pause
            this.setState({buttonText: "Pause", paused: true});
            console.log("Paused");
            console.log(this.state);
        }

        event.preventDefault();
    }

    render () {
        return (
            // <div className="timer-wrapper">
                <div className="timer">
                    <div className="timer-selection">
                        <button className="timer-button">Pomodoro</button>
                        <button className="timer-button">Short Break</button>
                        <button className="timer-button">Long Break</button>
                    </div>
                    <div className="timer-display">{moment.utc(this.state.currentTime.asMilliseconds()).format("mm:ss")}</div>
                    <button className="timer-control" onClick={this.handlePause}>{this.state.paused ? "Play" : "Pause"}</button>
                    {/* <button className="timer-control">Play/Pause</button> */}
                </div>
            // </div>
        )
    }
}

export default Timer;