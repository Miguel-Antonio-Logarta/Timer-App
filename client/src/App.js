import React, {useEffect} from "react";
import { useSelector } from 'react-redux';
import "./styles/App.css"
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";
import TodosPage from "./components/TodosPage";
import { SHOW_HOME, SHOW_TODOS, SHOW_SETTINGS, SHOW_USER } from "./other/constants";
import UserPage from "./components/UserPage";
import ringSound from "./resources/alarm.mp3";
import Timer from "./components/Timer";

function App() {
    const visibility = useSelector((state) => state.navbar);

    // useEffect(() => {
    //   console.log("app moutn");
    //   return () => console.log("app unmount");
    // }, [])

    return(
      <div className="the-app">
        <Timer sound={ringSound}/>
        <Navbar />
        {visibility[SHOW_HOME] && <HomePage />}
        {visibility[SHOW_TODOS] && <TodosPage key="todos-page" />}
        {visibility[SHOW_SETTINGS] && <SettingsPage />}
        {visibility[SHOW_USER] && <UserPage />}
        <div className="background"></div>
      </div>
    );
}

export default App;