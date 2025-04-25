import React, { useEffect, useState } from "react";
import moment from "moment";
import { Container, Row, Col, Card, Button, Table, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getStudentDataByBus } from "../../actions/StudentAction";
import { getStudentAttendanceToday, insertAttendanceHomeToSchoolABSENT, insertAttendanceHomeToSchoolIN, insertAttendanceHomeToSchoolOUT, insertAttendanceSchoolToHomeABSENT, insertAttendanceSchoolToHomeIN, insertAttendanceSchoolToHomeOUT } from "../../actions/AttendenceAction";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
    const currentDate = moment().format("dddd, MMMM Do YYYY");
    const token = sessionStorage.getItem("token");

    let busId = null;
    if (token) {
        const decoded = jwtDecode(token);
        busId = decoded.bus_id;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    const studentData = useSelector((state) => state.student.Student_data);
    const attendanceData = useSelector((state) => state.attendence.single) || {};

    // Search state 
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter students based on search query 
    const filteredStudents = studentData.filter((student) =>
        student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||  student.student_id.toString().includes(searchQuery)
    );

    useEffect(() => {
        if (busId) {
            dispatch(getStudentDataByBus(busId));
        }
    }, [dispatch, busId]);

    useEffect(() => {
        if (studentData.length > 0) {
            studentData.forEach((student) => {
                dispatch(getStudentAttendanceToday(student.student_id));
            });
        }
    }, [dispatch, studentData]);

    const handleLogout = () => {
        sessionStorage.removeItem("attendanceStatus");
        sessionStorage.removeItem("buslogin");
        sessionStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        alert("Logout Successfully...");
        navigate("/buslogin");
    };

    // Updated Inline CSS Styles
    const styles = {
        studentCard: {
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            background: "#f8f9fa",
            marginBottom: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        },
        studentInfo: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0 10px"
        },
        studentText: {
            fontSize: "1rem",
            fontWeight: "500",
            color: "#333",
            flex: 1,
            textAlign: "center"
        },
        buttonGroup: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            margin: "5px",
            width: "48%"
        },
        buttonHeading: {
            fontWeight: "bold",
            fontSize: "1rem",
            marginBottom: "10px",
            textAlign: "center"
        },
        buttonRow: {
            display: "flex",
            justifyContent: "center",
            gap: "10px"
        },
        buttonStyle: {
            minWidth: "100px",
            fontSize: "0.9rem",
            fontWeight: "bold"
        },
        tableContainer: {
            marginTop: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            overflow: "hidden"
        },
        table: {
            width: "100%",
            textAlign: "center",
            borderCollapse: "collapse"
        },
        tableHeader: {
            padding: "10px",
            fontWeight: "bold"
        },
        tableCell: {
            padding: "8px",
            borderBottom: "1px solid #ddd"
        },
        searchInput: {
            width: "50%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "1rem",
        }
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

    // Tooltips
    const studentListTooltip = (props) => <Tooltip {...props}>Student List</Tooltip>;
    const logoutTooltip = (props) => <Tooltip {...props}>Logout</Tooltip>;

    return (
        <>
            <main id="main" className="main">
                <section className="section attendance" >
                    <Container className="d-flex flex-column align-items-center py-5">
                        <Card className="text-center p-4 w-50 shadow">
                            <Card.Title className="h3">Attendance</Card.Title>
                            <Card.Text className="text-muted mt-3">{currentDate}</Card.Text>
                        </Card>

                        {/* Search Bar */}
                        <Form.Control
                            style={styles.searchInput}
                            type="text"
                            placeholder="Search by Student Name or ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        {/* Student Attendance List */}
                        <Row className="mt-4 w-75">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <Col key={student.student_id} xs={12} className="mb-3">
                                        <Card style={styles.studentCard} className="shadow">
                                            <div style={styles.studentInfo}>
                                                <p style={styles.studentText}>{student.student_name}</p>
                                                <p style={styles.studentText}>ID: {student.student_id}</p>
                                                <p style={styles.studentText}>Standard: {student.student_standard}</p>
                                            </div>

                                            {/* Two Sections with Headings */}
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                {/* Home To School Section */}
                                                <div style={styles.buttonGroup}>
                                                    <p style={styles.buttonHeading}>Home To School</p>
                                                    <div style={styles.buttonRow}>
                                                        <Button style={styles.buttonStyle} variant="warning" onClick={() => dispatch(insertAttendanceHomeToSchoolIN(student.student_id, busId))}>IN</Button>
                                                        <Button style={styles.buttonStyle} variant="success" onClick={() => dispatch(insertAttendanceHomeToSchoolOUT(student.student_id, busId))}>OUT</Button>
                                                        <Button style={styles.buttonStyle} variant="danger" onClick={() => dispatch(insertAttendanceHomeToSchoolABSENT(student.student_id, busId))}>ABSENT</Button>
                                                    </div>
                                                </div>

                                                {/* School To Home Section */}
                                                <div style={styles.buttonGroup}>
                                                    <p style={styles.buttonHeading}>School To Home</p>
                                                    <div style={styles.buttonRow}>
                                                        <Button style={styles.buttonStyle} variant="warning" onClick={() => dispatch(insertAttendanceSchoolToHomeIN(student.student_id, busId))}>IN</Button>
                                                        <Button style={styles.buttonStyle} variant="success" onClick={() => dispatch(insertAttendanceSchoolToHomeOUT(student.student_id, busId))}>OUT</Button>
                                                        <Button style={styles.buttonStyle} variant="danger" onClick={() => dispatch(insertAttendanceSchoolToHomeABSENT(student.student_id, busId))}>ABSENT</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Table below buttons */}
                                            <div style={styles.tableContainer}>
                                                <Table style={styles.table} striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th style={styles.tableHeader}>No.</th>
                                                            <th style={styles.tableHeader}>Destination</th>
                                                            <th style={styles.tableHeader}>Attendance Time</th>
                                                            <th style={styles.tableHeader}>Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {attendanceData[student.student_id] && attendanceData[student.student_id].length > 0 ? (
                                                            attendanceData[student.student_id].map((item, index) => (
                                                                <tr key={item.attendence_id}>
                                                                    <td style={styles.tableCell}>{index + 1}</td>
                                                                    <td style={styles.tableCell}>{item.destination}</td>
                                                                    <td style={styles.tableCell}>{moment(item.attendence_date_time).format("hh:mm:ss A")}</td>
                                                                    <td style={styles.tableCell}>{item.type}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="4" style={styles.tableCell}>No Attendance Found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col className="d-flex justify-content-center">
                                    <Card className="p-4 shadow text-center w-75">
                                        <div>No Students Found</div>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </section>
                <OverlayTrigger placement="top" overlay={studentListTooltip}>
                    <Button
                        style={{
                            ...floatingButtonStyle,
                            left: "20px",
                            backgroundColor: "#007bff",
                        }}
                        onClick={() => navigate("/attendencelist")}
                    >
                        <i className="bi bi-people"></i>
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
        </>
    );
};

export default Attendance;
