import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './views/components/ValidationRoute';
import BusLogin from './views/bus/Login';
import Dashboard from './views/Dashboard';
import mystore from './store/mystore';
import "bootstrap/dist/css/bootstrap.min.css";
import Attendance from './views/attendence/Attendence';
import AttendenceList from './views/attendence/AttendenceList';
import AttendenceCalendar from './views/attendence/AttendenceCalendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={mystore}>
        <BrowserRouter>
            <Routes>
                {/* Public Route */}
                <Route path="/buslogin" element={<BusLogin />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/attendence" element={<Attendance />} />
                    <Route path="/attendencelist" element={<AttendenceList />} />
                    <Route path="/attendencecalendar/:student_id" element={<AttendenceCalendar />} />
                </Route>

                {/* Redirect any unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);