import './styles/App.css';
import Timer from './components/Timer.js';
// import ATestButton from './components/ATestButton';
import Navbar from './components/Navbar';
import Background from './components/Background';
// import TestModal from './components/TestModal';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showModal: false
      showSettings: false,
      showStats: false,
      showLogin: false
    };
    
    this.showSettingsWindow = this.showSettingsWindow.bind(this);
    this.showStatsWindow = this.showStatsWindow.bind(this);
    this.showLoginWindow = this.showLoginWindow.bind(this);
    // this.toggleModal = this.toggleModal.bind(this);
  }

  // toggleModal() {
  //   console.log("The button click event has reached the parent");
  //   this.setState({showModal: !this.state.showModal});
  // }

  // TODO: change all of this and turn it into one function.
  // handleNavButtonClick(whichwindowtoshow)
  showSettingsWindow () {
    console.log("Settings are now showing");
    this.setState({showSettings: !this.state.showSettings});
  }

  showStatsWindow () {
    console.log("Stats are now showing");
    this.setState({showStats: !this.state.showStats});
  }

  showLoginWindow () {
    this.setState({showLogin: !this.state.showLogin});
  }

  render() {
    // console.log(this.state.showModal);
    return (
      <div className="the-app">
        <Navbar 
          showLoginWindow={this.showLoginWindow}
          showStatsWindow={this.showStatsWindow}
          showSettingsWindow={this.showSettingsWindow}
          // showLogin={this.state.showLogin}
          // showStats={this.state.showStats}
          // showSettings={this.state.showSettings}
        />
        <Timer />
        <Background />
        {/* <TestModal /> */}
        {/* <TestModal daClick={this.toggleModal} PutMyBallsInYoJaws={this.state.showModal}/>
        <ATestButton daClick={this.toggleModal}/> */}
      </div>
    );
  }
}

export default App;
