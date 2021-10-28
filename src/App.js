import React from "react";
import { useSelector } from 'react-redux';
import "./styles/App.css"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Settings from "./components/Settings";

function TestApp() {
    const visibility = useSelector((state) => state.Navbar);
    return(
      <div className="the-app">
        <Navbar />
        {visibility.showHome && <Home />}
        {visibility.showSettings && <Settings />}
        <div className="background"></div>
      </div>
    );
}

export default TestApp;