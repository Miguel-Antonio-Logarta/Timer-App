import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItemAdd from "./TodoItemAdd";
import TodoItem from "./TodoItem";
import TodoItemEditable from "./TodoItemEditable";
import { fetchTodosAsync } from "../redux/todoSlice";

function TodoList() {
    // This is not updating after the fetch request for some reason. It might be the selector or the useEffect hook.
    const { todos, addClicked, editableId } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch]);
    
    return (
        <div className="todo_list">
            {todos.map((todo) =>
            editableId.includes(todo.id) ? 
                <TodoItemEditable
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description} 
                    timeLeft={todo.timeLeft}
                    dueDate={todo.dueDate}
                    newTodo={false}
                /> :
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description} 
                    timeLeft={todo.timeLeft}
                    dueDate={todo.dueDate}
                />)
            }
            {addClicked ? <TodoItemEditable newTodo={true} /> : <TodoItemAdd />}
        </div>
    );
}

export default TodoList;