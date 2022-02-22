import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItemAdd from "./TodoItemAdd";
import TodoItem from "./TodoItem";
import { fetchTodosAsync, syncActiveTodoToDBAsync } from "../redux/todoSlice";
import TodoActive from "./TodoActive";

function TodoList() {
    // TodoList is responsible for rendering of active todo, normal todo, and completed todos
    // This is not updating after the fetch request for some reason. It might be the selector or the useEffect hook.
    // For some reason, when the timer is 
    const { todos } = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    // console.log(editableId);
    // console.log(todos);
    // useEffect(() => {
    //     if (fetchTodo)
    //         dispatch(fetchTodosAsync());
    // }, [dispatch, fetchTodo]);

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch])

    // const placeTodoActive = () => {
    //     if (Object.keys(activeTodo).length !== 0) {
    //         if (editableId.includes(activeTodo.id)) {
    //             return <TodoItemEditable key={activeTodo.id} todoData={activeTodo} />
    //         } else {
    //             // console.log("Rendering active");
    //             // console.log(activeTodo);
    //             return <TodoActive key={activeTodo.id} todoData={activeTodo} />
    //         }
    //     }
    // }

    // useEffect(() => {
    //     // On unmount, update the active todo 
    //     return () => {
    //         console.log("Unmounted list");
    //         // dispatch(updateTodoAsync(activeTodo));
    //     }
    // }, [])
    // console.log(`activeTodo id: ${activeTodo.id}`);
    useEffect(() => {
        // When todolist unmounts, dispatch an action that syncs the active todo 
        // To the server. Do not pass active Todo into the dispatch.
        // console.log("Mounting TodoList");
        return () => {
            // console.log("Dispatching action to DB");
            dispatch(syncActiveTodoToDBAsync());
            // console.log("Unmounting TodoList");
        }
        // return () => console.log("Unmounted");
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