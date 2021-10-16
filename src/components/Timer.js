import React from "react";
import moment from 'moment';

// TODOS:
// Stop when timer reaches zero
// Add sound effect for when timer reaches zero, when timer pauses, when timer plays
// Add feature to change timer value with long break, short break, and pomodoro
// One event handling function
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            // currentTime: moment.duration(25*60*1000), // Sets a 25 minutes counter in milliseconds
            currentTime: moment.duration(10*1000),
        }
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
        const isZero = this.state.currentTime.as('milliseconds') <= 0; 
        if (!this.state.paused && !isZero)
        {
            this.setState({currentTime: moment.duration(this.state.currentTime.asMilliseconds() - 1000)});
        }

        // Make sure to end the tick once duration reaches 0 and reset it.
    }

    handleButtonClick = (evt) => {
        const btn = evt.target;
        console.log(btn.name);
        switch (btn.name) {
            case "pomodoro":
                this.setState({currentTime: moment.duration(25*60*1000 + 0*1000), paused: true});
                break;
            case "short_break":
                this.setState({currentTime: moment.duration(5*60*1000 + 0*1000), paused: true});
                break;
            case "long_break":
                this.setState({currentTime: moment.duration(15*60*1000 + 0*1000), paused: true});
                break;
            case "pause":
                this.setState({paused: !this.state.paused});
                break;
            default:
                break;
        }
    }

    render () {
        return (
            // <div className="timer-wrapper">
                <div className="timer">
                    <div className="timer-selection">
                        <button className="timer-button" name="pomodoro" onClick={this.handleButtonClick}>Pomodoro</button>
                        <button className="timer-button" name="short_break" onClick={this.handleButtonClick}>Short Break</button>
                        <button className="timer-button" name="long_break" onClick={this.handleButtonClick}>Long Break</button>
                    </div>
                    <div className="timer-display">{moment.utc(this.state.currentTime.asMilliseconds()).format("mm:ss")}</div>
                    <button className="timer-control" name="pause" onClick={this.handleButtonClick}>{this.state.paused ? "Play" : "Pause"}</button>
                </div>
            // </div>
        )
    }
}

export default Timer;