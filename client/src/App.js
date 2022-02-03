import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./styles/App.css"
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";
import TodosPage from "./components/TodosPage";
import { SHOW_HOME, SHOW_TODOS, SHOW_SETTINGS, SHOW_USER } from "./other/constants";
import { tick } from "./redux/timerSlice";
import UserPage from "./components/UserPage";
import useSound from "./other/useSound";
import ringSound from "./resources/alarm.mp3";

function App() {
    const visibility = useSelector((state) => state.navbar);
    const { paused } = useSelector((state) => state.timer);
    const dispatch = useDispatch();
    useSound(ringSound);

    useEffect(() => {
      const interval = setInterval(() => {
        if (!paused) {
          dispatch(tick());
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [dispatch, paused]);

    return(
      <div className="the-app">
        <Navbar />
        {visibility[SHOW_HOME] && <HomePage />}
        {visibility[SHOW_TODOS] && <TodosPage />}
        {visibility[SHOW_SETTINGS] && <SettingsPage />}
        {visibility[SHOW_USER] && <UserPage />}
        <div className="background"></div>
      </div>
    );
}

export default App;