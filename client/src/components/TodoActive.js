import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoActive(props) {
    const { activeTodo } = useSelector((state) => state.todos);

    if (Object.keys(activeTodo).length === 0) {
        return null;
    } else {
        return (
            <TodoItem todoData={activeTodo}/>
        );
    }
}

export default TodoActive;
