import React from "react";
import { FaCheck, FaRegTrashAlt, FaRedo } from "react-icons/fa";
import { convertToHMSString, toReadableDate } from "../other/utilities";
import { useAppDispatch } from "../state/hooks";
import {
	deleteTodo,
	editingTodo,
	setCompletedTodo,
} from "../state/slice/todoSlice";
import { TodoItem } from "../other/types";
import { BsStopwatch } from "react-icons/bs";

const TodoListItem: React.FC<TodoItem> = (props) => {
	const dispatch = useAppDispatch();

	const outputDueDate = (date: string): string => {
		const dateString = toReadableDate(date); // toReadableDate returns "" when the date is not valid
		return dateString === "" ? "" : `Due: ${dateString}`;
	};

	return (
		<div className={`todo-item ${props.completed ? "completed" : ""}`}>
			<div className="todo-progress">
				<div className="todo-progress-inner"></div>
			</div>
			<div
				className="todo-main-content"
				onClick={() => dispatch(editingTodo(props.id))}
			>
				<h3>{props.title}</h3>
				{/* If due date is valid, render the text. If the time left was also provided, render a comma */}
				{/* Only renders text if due date is not null. toReadableDate also returns "" if dueDate is not a valid date string*/}
				<span>{!!props.dueDate && outputDueDate(props.dueDate)}</span>
				{/* If the time left was provided, render the text */}
				<span style={{ whiteSpace: "pre" }}>
					{!!(props.dueDate && props.timeLeft) && " "}
				</span>
				<span>
					{!!props.timeLeft &&
						`Time Left: ${convertToHMSString(props.timeLeft)}`}
				</span>
				<p>{props.description}</p>
			</div>
			<div className="todo-button-area">
				<button
					title={props.completed ? "Redo todo" : "Complete todo"}
					onClick={() =>
						dispatch(
							setCompletedTodo({ id: props.id, completed: !props.completed })
						)
					}
					className="medium-radius blue-button todo-complete"
				>
					{props.completed ? <FaRedo /> : <FaCheck />}
				</button>

				<button
					title="Set as active todo"
					onClick={() =>
						dispatch(
							setCompletedTodo({ id: props.id, completed: !props.completed })
						)
					}
					className="small-radius blue-button todo-make-active"
				>
					<BsStopwatch />
				</button>

				<button
					title="Delete todo"
					onClick={() => dispatch(deleteTodo(props.id))}
					className="small-radius danger todo-delete"
				>
					<FaRegTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default TodoListItem;
