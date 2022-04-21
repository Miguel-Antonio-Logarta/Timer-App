import React from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { creatingNewTodo } from "../../state/slice/todoSlice";
import { convertToHMSString } from "../../other/utilities";
import CreateTodo from "../CreateTodo";
import EditTodo from "../EditTodo";
import TodoList from "../TodoList";
import { Link } from "react-router-dom";

const TodosPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { createNewTodo, editingTodo } = useAppSelector((state) => state.todos);
	const { currentInterval, remainingTime } = useAppSelector(
		(state) => state.timer
	);
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	// These app selectors on the bottom might be the culprit
	// const todoIds = useAppSelector((state) => selectTodoIds(state));
	// const todoIds = useAppSelector(selectTodoIds, shallowEqual);
	// const createNewTodo = false;
	// const editingTodo = false;

	if (!isAuthenticated) {
		return (
			<div className="todos-page">
				<div className="rounded-background">
					<h2>Todos</h2>
					<div className="regular-form-outer">
						<p>You need to be logged in to view and create todos</p>
						<Link to="/profile/login" className="underline-link">
							&gt; Go login here! &lt;
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="todos-page">
			{/* The conditional rendering forces the whole component to rerender even though todolist may have not updated */}
			{createNewTodo && <CreateTodo />}
			{editingTodo && <EditTodo />}
			<div className="rounded-background">
				<h2>Todos</h2>
				<div className="todolist-options">
					<div className="todo-list-selection">
						{/* <label htmlFor="todo-list-selection">Current Todo List:</label>
            <select name="todo-list-selection">
              <option value="todo list1">todo list 1</option>
              <option value="todo list2">todo list 2</option>
            </select> */}
					</div>
					<p className="center-text">
						{currentInterval}: {convertToHMSString(remainingTime)}
					</p>
					<button
						className="blue-button add-todo"
						onClick={() => dispatch(creatingNewTodo(true))}
					>
						<FaPlus />
					</button>
				</div>

				<TodoList />
			</div>
		</div>
	);
};

export default TodosPage;
