import React from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clickAdd } from "../redux/todoSlice";

function TodoItemAdd(props) {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(clickAdd(true))} className="add-todo">
            <div className="plus-sign">
                <MdAdd className="no-events" size="32px"/>
            </div>
        </button>
    );
}

export default TodoItemAdd;