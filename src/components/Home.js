import React from "react";
import Timer from "./Timer.js"

class Home extends React.Component {
    render() {
        return(
        <div className="home-wrapper">
            <Timer settings={this.props.settings}/>
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
                    <button>Complete</button>
                </div>
            </div>
        </div>
        );
    }
}

export default Home;