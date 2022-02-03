import React from "react";
import TimerController from "./TimerController";

function HomePage() {
    return(
        <div className="home-wrapper">
            <TimerController />
            <div className="remaining-todos">
                <div className="left-portion">
                    <div className="upper-portion">
                        <h3>Your Current Task: Finish this component</h3>
                        <span>Time Left to completion: <b>1:04:55</b></span>
                    </div>
                    <div className="lower-portion">
                        <p>Finish making this component under the timer.</p>
                    </div>
                </div>
                <div className="right-portion">
                    <button className="check-button">Complete</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;