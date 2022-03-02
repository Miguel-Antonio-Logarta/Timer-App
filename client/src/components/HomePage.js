import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TimerController from "./TimerController";
import TodoSmall from "./TodoSmall";
import { syncActiveTodoToDBAsync } from "../redux/todoSlice";
function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        // When todolist unmounts, dispatch an action that syncs the active todo 
        return () => {
            dispatch(syncActiveTodoToDBAsync());
        }
    }, [dispatch]);

    return(
        <div className="home-wrapper">
            <TimerController />
            <TodoSmall />
        </div>
    );
}

export default HomePage;