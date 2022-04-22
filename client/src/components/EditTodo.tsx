import React, { useEffect, useState } from "react";
import { TodoItemForm, UpdateTodoItem } from "../other/types";
import { convertToHMS, convertToMilliseconds } from "../other/utilities";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { updateTodo, stopEditingTodo, clearTodoErrors } from "../state/slice/todoSlice";
import TodoForm from "./forms/TodoForm";

const EditTodo: React.FC = () => {
	const dispatch = useAppDispatch();
	const editSuccess = useAppSelector((state) => state.todos.editSuccess);
	const todoToEdit = useAppSelector((state) => state.todos.todoToEdit);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = (data: TodoItemForm): void => {
		const timeLeft: number = convertToMilliseconds({
			hrs: data.hrs,
			mins: data.mins,
			secs: data.secs,
		});

		// Add a check here to see if id, ownerId, createdOn, and completed are undefined
		const todoItem: UpdateTodoItem = {
			id: todoToEdit?.id!,
			ownerId: todoToEdit?.ownerId!,
			createdOn: todoToEdit?.createdOn!,
			completed: todoToEdit?.completed!,
			title: data.title,
			description: data.description === "" ? null : data.description,
			dueDate: data.dueDate === "" ? null : data.dueDate,
			timeLeft: timeLeft <= 0 ? null : timeLeft,
		};

		dispatch(updateTodo(todoItem));
		setIsSubmitting(true);
	};

	const handleDiscard = (): void => {
		dispatch(stopEditingTodo());
		dispatch(clearTodoErrors());
	};

	// Check if this is right
	const editData: TodoItemForm = {
		title: todoToEdit?.title || "",
		description: todoToEdit?.description || "",
		dueDate: todoToEdit?.dueDate || "",
		...convertToHMS(todoToEdit?.timeLeft || 0),
	};

	useEffect(() => {
		if (editSuccess && isSubmitting) {
			dispatch(stopEditingTodo());
		}
		return () => {
			dispatch(clearTodoErrors())
		};
	}, [editSuccess, isSubmitting, dispatch])

	return (
		<div className="todo-modal">
			<div className="todo-form-outer">
				<h2>Edit Todo</h2>
				<TodoForm
					todoData={editData}
					submitData={onSubmit}
					discard={handleDiscard}
				/>
			</div>
		</div>
	);
};

export default EditTodo;
