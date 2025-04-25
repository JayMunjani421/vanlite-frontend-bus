import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isLoggedIn = sessionStorage.getItem("buslogin");
    if (!isLoggedIn) {
        alert("Please login first!");
        return <Navigate to="/buslogin" />;
    }
    return <Outlet />;  // Renders nested routes
};

export default PrivateRoute;
