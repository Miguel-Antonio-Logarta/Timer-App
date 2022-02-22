import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToHMSString } from "../other/utilities";
import TodoList from "./TodoList";

function TodosPage() {
    // const dispatch = useDispatch();
    const { currentTime } = useSelector((state) => state.timer);
    // const { activeTodo } = useSelector((state) => state.todos);
    const timerDisplay = convertToHMSString(currentTime);

    // useEffect(() => {
    //     console.log("todo page moutn");
    //     return () => console.log("todo page unmount");
    // }, [dispatch])

    // useEffect(() => {
    //     // On unmount, update the active todo 
    //     return () => {
    //         console.log("Unmounted list");
    //         // dispatch(updateTodoAsync(activeTodo));
    //     }
    // }, [dispatch])

    return(
        <div>
            <div className="todo-timer">
                {timerDisplay}
            </div>
            <TodoList key="todo-list"/>
        </div>
    );
}

export default TodosPage;