// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Container, Card, Button } from "react-bootstrap";
// import { jwtDecode } from "jwt-decode";
// import { getStudentDataByBus } from "../../actions/StudentAction";

// const AttendenceList = () => {
//     const dispatch = useDispatch();
//     const studentData = useSelector((state) => state.student.Student_data);
//     const loading = useSelector((state) => state.student.loading);

//     const token = sessionStorage.getItem("token");
//     let busId = null;
//     if (token) {
//         const decoded = jwtDecode(token);
//         busId = decoded.bus_id;
//     }

//     useEffect(() => {
//         if (busId) {
//             dispatch(getStudentDataByBus(busId));
//         }
//     }, [dispatch, busId]);

//     // Styling for table
//     const styles = {
//         table: {
//             textAlign: "center",
//         },
//         header: {
//             backgroundColor: "#f8f9fa",
//             fontWeight: "bold",
//             textAlign: "center",
//         },
//         cell: {
//             textAlign: "center",
//         },
//     };

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student List</h3>

//                     {/* Loading State */}
//                     {loading && <p className="text-center mt-3">Loading students...</p>}

//                     {/* Student Table */}
//                     {!loading && studentData.length > 0 ? (
//                         <Table striped bordered hover className="mt-3" style={styles.table}>
//                             <thead>
//                                 <tr>
//                                     <th style={styles.header}>No.</th>
//                                     <th style={styles.header}>Student Name</th>
//                                     <th style={styles.header}>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {studentData.map((student, index) => (
//                                     <tr key={student.student_id}>
//                                         <td style={styles.cell}>{index + 1}</td>
//                                         <td style={styles.cell}>{student.student_name}</td>
//                                         <td style={styles.cell}>
//                                             <Button style={styles.button} variant="success">View</Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     ) : (
//                         !loading && <p className="text-center mt-3">No students found</p>
//                     )}
//                 </Card>
//             </Container>
//         </main>
//     );
// };

// export default AttendenceList;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getStudentDataByBus } from "../../actions/StudentAction";

const AttendenceList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigation
    const studentData = useSelector((state) => state.student.Student_data);
    const loading = useSelector((state) => state.student.loading);

    const token = sessionStorage.getItem("token");
    let busId = null;
    if (token) {
        const decoded = jwtDecode(token);
        busId = decoded.bus_id;
    }

    useEffect(() => {
        if (busId) {
            dispatch(getStudentDataByBus(busId));
        }
    }, [dispatch, busId]);

    // Styling for table
    const styles = {
        table: {
            textAlign: "center",
        },
        header: {
            backgroundColor: "#f8f9fa",
            fontWeight: "bold",
            textAlign: "center",
        },
        cell: {
            textAlign: "center",
        },
        // floatingButton: {
        //     position: "fixed",
        //     bottom: "20px",
        //     left: "20px",
        //     width: "60px",
        //     height: "60px",
        //     borderRadius: "50%",
        //     backgroundColor: "#28a745",
        //     color: "white",
        //     border: "none",
        //     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        //     fontSize: "1.5rem",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     cursor: "pointer",
        // },
    };

    const floatingButtonStyle = {
        position: "fixed",
        bottom: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        color: "white",
        border: "none",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        fontSize: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    };

    const attendenceTooltip = (props) => <Tooltip {...props}>Attendence</Tooltip>;
    const logoutTooltip = (props) => <Tooltip {...props}>Logout</Tooltip>;

    const handleLogout = () => {
        sessionStorage.removeItem("attendanceStatus");
        sessionStorage.removeItem("buslogin");
        sessionStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        alert("Logout Successfully...");
        navigate("/buslogin");
    };

    return (
        <main id="main" className="main">
            <Container className="py-5">
                <Card className="p-4 shadow">
                    <h3 className="text-center">Student List</h3>

                    {/* Loading State */}
                    {loading && <p className="text-center mt-3">Loading students...</p>}

                    {/* Student Table */}
                    {!loading && studentData.length > 0 ? (
                        <Table striped bordered hover className="mt-3" style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.header}>No.</th>
                                    <th style={styles.header}>Student Name</th>
                                    <th style={styles.header}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((student, index) => (
                                    <tr key={student.student_id}>
                                        <td style={styles.cell}>{index + 1}</td>
                                        <td style={styles.cell}>{student.student_name}</td>
                                        <td style={styles.cell}>
                                            <Button variant="success" onClick={() => navigate(`/attendencecalendar/${student.student_id}`)}>View</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        !loading && <p className="text-center mt-3">No students found</p>
                    )}
                </Card>
            </Container>

            {/* Floating Attendance Button (Left Bottom) */}
            {/* <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
                <Button
                    style={styles.floatingButton}
                    onClick={() => navigate("/attendence")}
                >
                    <i className="bi bi-calendar-check"></i>
                </Button>
            </OverlayTrigger> */}

            {/* Floating Back Button */}
            <OverlayTrigger placement="top" overlay={attendenceTooltip}>
                <Button
                    style={{
                        ...floatingButtonStyle,
                        left: "20px",
                        backgroundColor: "#28a745",
                    }}
                    onClick={() => navigate("/attendence")}
                >
                    <i className="bi bi-calendar-check"></i>
                </Button>
            </OverlayTrigger>

            {/* Logout Button */}
            <OverlayTrigger placement="top" overlay={logoutTooltip}>
                <Button
                    style={{
                        ...floatingButtonStyle,
                        right: "20px",
                        backgroundColor: "#dc3545",
                    }}
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right"></i>
                </Button>
            </OverlayTrigger>
        </main>
    );
};

export default AttendenceList;
