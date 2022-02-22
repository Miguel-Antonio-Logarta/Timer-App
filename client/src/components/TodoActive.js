import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tickActiveTimeLeft, updateTodoAsync } from '../redux/todoSlice';
import TodoItem from './TodoItem';

function TodoActive(props) {
    // console.log(todoData);
    // const dispatch = useDispatch();
    // const { paused, currentTime } = useSelector((state) => state.timer);
    const { activeTodo } = useSelector((state) => state.todos);
    // const [time, setTime] = useState(activeTodo.timeLeft);

    // if (!paused) {
    //     setTime(time - 1000);
    // }
    // useEffect(() => {
    //     // console.log("mounted");
    //     const interval = setInterval(() => {
    //         if (!paused) {
    //             // console.log("I'm not paused");
    //             console.log(time);
    //             setTime((time) => time - 1000);
    //         }
    //     }, 1000)
    //     // if (!paused) {
    //     //     // dispatch(tickActiveTimeLeft());
    //     //     console.log("setting time");
    //     //     console.log(time);
    //     //     setTime((time) => time - 1000);
    //     // }
    //     return () => {
    //         console.log("Unmounted");
    //         clearInterval(interval);
    //         // dispatch(updateTodoAsync({timeLeft: time, ...activeTodo}));
    //     };
    //     // return () => console.log("Unmounted");
    // }, [paused, time])
    // useEffect(() => {
    //     console.log("active todo moutn");
    //     return () => {
    //         console.log("active todo unmount")
    //         // dispatch(updateTodoAsync({timeLeft: time, ...todoData}));
    //      };
    // }, [dispatch, todoData]);
    // useEffect(() => {
    //     console.log("active todo mounted");
    //     // // dispatch(tickActiveTimeLeft());
    //     // // setTime((time) => time - 1000);
    //     return () => {
    //         console.log("active todo unmounted");
    //         // dispatch(updateTodoAsync({activeTodo}));
    //     }
    //     // const timer = setInterval(() => {
    //     //     dispatch(tickActiveTimeLeft());
    //     // }, 1000);
    //     // return () => clearInterval(timer);
    // }, [dispatch]);

    if (Object.keys(activeTodo).length === 0) {
        return null;
    } else {
        return (
            // <TodoItem todoData={{timeLeft: time, ...activeTodo}}/>
            <TodoItem todoData={activeTodo}/>
        );
    }
}

export default TodoActive;
