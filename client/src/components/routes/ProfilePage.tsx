import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useAppSelector } from "../../state/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProfilePage: React.FC = () => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
	let location = useLocation();
	const renderLineChart = (
		<LineChart width={400} height={300} data={data}>
			<Line type="monotone" dataKey="uv" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="name" />
			<YAxis />
		</LineChart>
	);

	if (!isAuthenticated) {
		return <Navigate to="/profile/login" replace state={{ from: location }} />;
	}

	return (
		<div className="profile-page">
			<div className="rounded-background">
				<Outlet />
				<div className="graph">
					<h2>Your Progress</h2>
					{renderLineChart}
				</div>
				<div className="settings">
					<h2>Settings</h2>

					<div className="setting-item">
						<h3>This is a setting</h3>
						<p>
							And this is a description that tells us what this setting does
						</p>
						<input type="number" placeholder="you can input a number here" />
					</div>

					<div className="setting-item">
						<h3>This is another setting</h3>
						<p>
							And this is another description that tells us what this setting
							does
						</p>
						<input type="range" />
					</div>

					<div className="setting-item">
						<h3>This is the third settings</h3>
						<p>
							This setting has a description that spans multiple lines because
							it is very long. However, blah blah blah blah and other more
							useless text that is random garbage.
						</p>
						<input type="checkbox" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
