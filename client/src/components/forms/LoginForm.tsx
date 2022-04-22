import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { clearErrors, requestLogIn } from "../../state/slice/authSlice";

interface Props {}

interface LoginFormData {
	username: string;
	password: string;
}

const LoginForm: React.FC<Props> = () => {
	const dispatch = useAppDispatch();

	const { serverErrors, isFetching } = useAppSelector((state) => state.auth);

	const [data, setData] = useState<LoginFormData>({
		username: "",
		password: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(requestLogIn(data));
	};

	useEffect(() => {
		return () => {
			dispatch(clearErrors());
		};
	}, [dispatch]);

	return (
		<>
			<h2>Login</h2>
			<p className="center-text">
				Log in to your account to view your todos, statistics, and settings.
			</p>
			<form className="login-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username" className="small-radius">
						Username
					</label>
					<input
						name="username"
						onChange={handleChange}
						className="small-radius"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password" className="small-radius">
						Password
					</label>
					<input
						name="password"
						type="password"
						onChange={handleChange}
						className="small-radius"
					/>
				</div>

				<div className="form-group center-text">
					{isFetching ? (
						<span className="small-text center-text">Logging In...</span>
					) : (
						<span className="error-message">{serverErrors.login}</span>
					)}
				</div>

				<button className="blue-button" type="submit">
					Log In
				</button>
			</form>

			{/* <Link to="../forgotPassword" className="underline-link">
				Forgot your password?
			</Link> */}
			<Link to="../signUp" className="underline-link">
				Or Sign Up Here!
			</Link>
		</>
	);
};

export default LoginForm;
