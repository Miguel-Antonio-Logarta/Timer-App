import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import TimerPage from './components/routes/TimerPage';
import TodosPage from './components/routes/TodosPage';
import ProfilePage from './components/routes/ProfilePage';
import Login from './components/routes/Login';
import ChangeEmailForm from './components/forms/ChangeEmailForm';
import ChangePasswordForm from './components/forms/ChangePasswordForm';
import SignUp from './components/routes/SignUp';
import ForgotPassword from './components/routes/ForgotPassword';
import ProfileOverview from './components/ProfileOverview';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="todos" element={<TodosPage />} />
        {/* <Route path="settings" element={<SettingsPage />}>Settings</Route> */}
        <Route path="profile">
          {/* Profile has an outlook */}
          <Route path="dashboard" element={<ProfilePage />}>
            {/* Shows profile overview */}
              <Route path="changeEmail" element={<ChangeEmailForm />} />
              <Route path="changePassword" element={<ChangePasswordForm />} />
              <Route index element={<ProfileOverview />} />
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="forgotPassword" element={<ForgotPassword />}></Route>
        </Route>
        <Route path="*" element={<TimerPage />} />
      </Routes>
    </>
  );
}

export default App;
