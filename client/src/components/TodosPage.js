import React from "react";
import { useSelector } from "react-redux";
import { convertToHMSString } from "../other/utilities";
import TodoList from "./TodoList";

function TodosPage() {
    const { currentTime } = useSelector((state) => state.timer);
    const { loggedIn } = useSelector((state) => state.user);
    const timerDisplay = convertToHMSString(currentTime);

    return(
        <div>
            <div className="todo-timer">
                {timerDisplay}
            </div>
            {!loggedIn && <h3 className="todo-list-login">You need to be logged in to create todos</h3>}
            <TodoList key="todo-list"/>
        </div>
    );
}

export default TodosPage;