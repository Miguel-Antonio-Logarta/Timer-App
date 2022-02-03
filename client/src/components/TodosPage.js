import React from "react";
import Timer from "./Timer";
import TodoList from "./TodoList";

function TodosPage() {
    return(
        <div>
            <Timer className="todo-timer"/>
            <TodoList />
        </div>
    );
}

export default TodosPage;