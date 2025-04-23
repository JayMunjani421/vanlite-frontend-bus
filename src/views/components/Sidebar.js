import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        // sessionStorage.clear();
        sessionStorage.removeItem("attendanceStatus");
        sessionStorage.removeItem("buslogin");
        sessionStorage.removeItem("token");
        dispatch({ "type": "LOGOUT" });
        alert("Logout Successfully...");
        navigate("/buslogin");
    };

    return (<>
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link " href="/">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#bus-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Bus</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="bus-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {sessionStorage.getItem("buslogin") ? (
                            <li className="nav-item">
                                <a className="nav-link" onClick={logout} style={{ cursor: "pointer" }}>
                                    <i className="bi bi-circle"></i><span>Logout</span>
                                </a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/buslogin" className="nav-link">
                                    <i className="bi bi-circle"></i><span>Login</span>
                                </Link>
                            </li>
                        )}

                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#attendence-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Attendence</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="attendence-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/attendence">
                                <i className="bi bi-circle"></i><span>Attendence</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    </>);
}

export default Sidebar;