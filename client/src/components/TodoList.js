import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItemAdd from "./TodoItemAdd";
import TodoItem from "./TodoItem";
import { fetchTodosAsync, syncActiveTodoToDBAsync } from "../redux/todoSlice";
import TodoActive from "./TodoActive";

function TodoList() {
    // TodoList is responsible for rendering of active todo, normal todo, and completed todos
    const { todos } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch])

    useEffect(() => {
        // When todolist unmounts, dispatch an action that syncs the active todo 
        return () => {
            dispatch(syncActiveTodoToDBAsync());
        }
    }, [dispatch]);
    
    return (
        <div className="todo_list">
            <TodoActive key="active-todo" />
            {
                todos.map((todo) => <TodoItem key={todo.id} todoData={todo} />)
            }
            <TodoItemAdd />
        </div>
    );
}

export default TodoList;