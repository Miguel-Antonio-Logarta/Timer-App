import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { fetchTodos } from "../state/slice/todoSlice";
import TodoListItem from "./TodoListItem";

/* There's a performance problem here. Every time the todo list is updated, a new array is created in the state, 
which causes the whole todo list to rerender when only one todo changed.
Instead what we can do is pass the id and key to the todo item. Then the todo item can look at the store and change their appearance based on that.
https://redux.js.org/tutorials/fundamentals/part-5-ui-react */
const TodoList: React.FC = () => {
	// const todoIds = useAppSelector(selectTodoIds);
	// const todoIds: Array<number> = useAppSelector((state) => state.todos.todos.map((todo) => todo.id));
	const todos = useAppSelector((state) => state.todos.todos);
	// const { isAuthenticated } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<>
			{todos.map((todo) => (
				// <TodoListItem key={todoId} id={todoId} />
				<TodoListItem
					key={todo.id}
					id={todo.id}
					ownerId={todo.ownerId}
					title={todo.title}
					description={todo.description}
					timeSet={todo.timeSet}
					timeLeft={todo.timeLeft}
					dueDate={todo.dueDate}
					createdOn={todo.createdOn}
					completed={todo.completed}
				/>
			))}
		</>
	);
};

export default TodoList;
