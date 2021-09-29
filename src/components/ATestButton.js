import React from "react";

class ATestButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yeah: true,
            dabuttontext: "yeah"
        }

        this.buttonclicktext = this.buttonclicktext.bind(this);
    }

    buttonclicktext(event) {
        const bruhbruh = this.state.yeah;
        if (bruhbruh) {
            this.setState({yeah: false, dabuttontext: "nah"});
        }
        else {
            this.setState({yeah: true, dabuttontext: "yeah"});
        }
    }

    render() {
        return(
            <button onClick={this.buttonclicktext}>{this.state.dabuttontext}</button>
        )
    }
}

export default ATestButton;