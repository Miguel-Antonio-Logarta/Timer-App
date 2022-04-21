import React from "react";
import { CreateTodoItem, TodoItemForm } from "../other/types";
import { convertToMilliseconds } from "../other/utilities";
import { useAppDispatch } from "../state/hooks";
import { createTodo, creatingNewTodo } from "../state/slice/todoSlice";
import TodoForm from "./forms/TodoForm";

const CreateTodo: React.FC = () => {
	const dispatch = useAppDispatch();

	const createNewTodo = (data: TodoItemForm): void => {
		const timeLeft: number = convertToMilliseconds({
			hrs: data.hrs,
			mins: data.mins,
			secs: data.secs,
		});

		const todoItem: CreateTodoItem = {
			title: data.title,
			description: data.description === "" ? null : data.description,
			dueDate: data.dueDate === "" ? null : data.dueDate,
			timeLeft: timeLeft <= 0 ? null : timeLeft,
		};

		dispatch(createTodo(todoItem));
		dispatch(creatingNewTodo(false));
	};

	const handleDiscard = (): void => {
		dispatch(creatingNewTodo(false));
	};

	return (
		<div className="todo-modal">
			<div className="todo-form-outer">
				<h2>Create a Todo</h2>
				<TodoForm
					todoData={{
						title: "",
						description: "",
						dueDate: "",
						hrs: 0,
						mins: 0,
						secs: 0,
					}}
					submitData={createNewTodo}
					discard={handleDiscard}
				/>
			</div>
		</div>
	);
};

export default CreateTodo;
