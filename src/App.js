import './styles/App.css';
import Timer from './components/Timer.js';
import Navbar from './components/Navbar.js';
import Settings from './components/Settings.js';
import Background from './components/Background.js';
import Todos from "./components/Todos.js"
import User from "./components/User.js"
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "Home"
    };
  }

  handleNavButtonClick = (evt) => {
    this.setState({toggle: evt.target.name});
  }

  showComponentToWebpage = (name) => {
    // Depending on the name, show the corect component.
    switch(name) {
      case "Home":
        return <Timer />
      case "Todos":
        return <Todos />
      case "Settings":
        return <Settings />
      case "User":
        return <User />
      default:
        break;
    }
  }

  render() {
    return (
      <div className="the-app">
        <Navbar 
          handleNavButtonClick={this.handleNavButtonClick}    // Pass the button event to the navbar's components
        />

        {this.showComponentToWebpage(this.state.toggle)       // Call this function to display the proper component
        }
        <Background />
      </div>
    );
  }
}

export default App;
