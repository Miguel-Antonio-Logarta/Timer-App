import React from "react";
import { useSelector } from "react-redux";
import { convertToHMSString } from "../other/utilities";
import TodoList from "./TodoList";

function TodosPage() {
    const { currentTime } = useSelector((state) => state.timer);
    const timerDisplay = convertToHMSString(currentTime);

    return(
        <div>
            <div className="todo-timer">
                {timerDisplay}
            </div>
            <TodoList />
        </div>
    );
}

export default TodosPage;