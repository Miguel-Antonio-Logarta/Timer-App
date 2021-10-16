import React from "react";

class SettingsWindow extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.show) {
            return(
                <div>This is the settings window</div>
            );
        }
        else {
            return(null);
        }
    }
}