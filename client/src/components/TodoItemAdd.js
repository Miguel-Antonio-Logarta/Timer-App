import React from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clickAdd } from "../redux/todoSlice";
import TodoItemEditable from "./TodoItemEditable";

function TodoItemAdd(props) {
    const dispatch = useDispatch();
    const { addClicked } = useSelector((state) => state.todos);

    if (addClicked) {
        return <TodoItemEditable todoData={{}} />
    } else {
        return (
            <button onClick={() => dispatch(clickAdd(true))} className="add-todo">
                <div className="plus-sign">
                    <MdAdd className="no-events" size="32px"/>
                </div>
            </button>
        );
    }
}

export default TodoItemAdd;