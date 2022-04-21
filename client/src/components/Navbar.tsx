import React from "react";
import { FaStopwatch, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<>
			<header>
				<div className="inner-header">
					<div className="logo">Timers</div>

					<nav>
						<ul>
							<li>
								<NavLink to="timer" className="nav-link">
									<FaStopwatch className="nav-icon" />
									<span className="nav-link-text">Timer</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="todos" className="nav-link">
									<FaCalendarAlt className="nav-icon" />
									<span className="nav-link-text">Todos</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="profile/dashboard" className="nav-link">
									<FaUserAlt className="nav-icon" />
									<span className="nav-link-text">Profile</span>
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Navbar;
