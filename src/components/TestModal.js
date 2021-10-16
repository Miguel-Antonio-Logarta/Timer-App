import react from "react";

class TestModal extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        console.log(this.props.PutMyBallsInYoJaws)
        if (this.props.PutMyBallsInYoJaws){
            return(
                <div>
                    <p style={{color:"black"}}>This is the modal</p>
                    <button onClick={this.props.daClick}>Close</button>
                </div>
            );
        }
        else {
            return(
                null
            );
        }
    }
}

export default TestModal;