import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TimerController from "./TimerController";
import TodoSmall from "./TodoSmall";
import { syncActiveTodoToDBAsync } from "../redux/todoSlice";
function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        // When todolist unmounts, dispatch an action that syncs the active todo 
        // To the server. Do not pass active Todo into the dispatch.
        console.log("Mounting Home");
        return () => {
            console.log("Dispatching action to DB");
            dispatch(syncActiveTodoToDBAsync());
            console.log("Unmounting Home");
        }
        // return () => console.log("Unmounted");
    }, [dispatch]);

    return(
        <div className="home-wrapper">
            <TimerController />
            <TodoSmall />
        </div>
    );
}

export default HomePage;