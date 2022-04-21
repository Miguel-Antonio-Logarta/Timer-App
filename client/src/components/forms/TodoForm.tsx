import React, { useEffect, useState } from "react";
import { TodoItemForm } from "../../other/types";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setSubmitting, validateTodoForm } from "../../state/slice/todoSlice";

interface Props {
	todoData: TodoItemForm;
	submitData: (data: TodoItemForm) => void;
	discard: () => void;
}

const TodoForm: React.FC<Props> = ({ submitData, discard, ...props }) => {
	const dispatch = useAppDispatch();
	const { errors, submittingForm } = useAppSelector((state) => state.todos);
	const [data, setData] = useState<TodoItemForm>({
		title: props.todoData.title,
		description: props.todoData.description,
		dueDate: props.todoData.dueDate,
		hrs: props.todoData.hrs,
		mins: props.todoData.mins,
		secs: props.todoData.secs,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(validateTodoForm(data));
		dispatch(setSubmitting(true));
	};

	useEffect(() => {
		if (
			Object.values(errors.form).every((error) => error === "") &&
			submittingForm
		) {
			submitData(data);
			dispatch(setSubmitting(false));
		}
	}, [errors, submittingForm, dispatch, data, submitData]);

	return (
		<form className="todo-form" onSubmit={onSubmit}>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<textarea
					defaultValue={props.todoData.title}
					onChange={handleChange}
					name="title"
					required
				/>
				<span className="error-message">{errors.form.title}</span>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>
				<textarea
					defaultValue={props.todoData.description}
					onChange={handleChange}
					name="description"
				/>
				<span className="error-message">{errors.form.description}</span>
			</div>

			<div className="time-input form-group">
				<span>How much time do you want to spend on this todo?</span>
				<label htmlFor="hrs">Hrs</label>
				<input
					min={0}
					max={99}
					onChange={handleChange}
					defaultValue={props.todoData.hrs}
					name="hrs"
					type="number"
				/>

				<label htmlFor="mins">Mins</label>
				<input
					min={0}
					max={59}
					onChange={handleChange}
					defaultValue={props.todoData.mins}
					name="mins"
					type="number"
				/>

				<label htmlFor="secs">Secs</label>
				<input
					min={0}
					max={59}
					onChange={handleChange}
					defaultValue={props.todoData.secs}
					name="secs"
					type="number"
				/>
				<span className="error-message">{errors.form.time}</span>
			</div>

			<div className="form-group">
				<label htmlFor="dueDate">Due Date</label>
				<input
					onChange={handleChange}
					defaultValue={props.todoData.dueDate}
					name="dueDate"
					type="date"
				/>
				<span className="error-message">{errors.form.dueDate}</span>
			</div>

			<button type="button" className="danger" onClick={() => discard()}>
				Discard
			</button>
			<button type="submit" className="blue-button">
				Save
			</button>
		</form>
	);
};

export default TodoForm;
