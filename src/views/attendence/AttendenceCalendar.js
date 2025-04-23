// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card } from "react-bootstrap";

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     // Placeholder for events (We will replace this with attendance data)
//     const [events, setEvents] = useState([]);

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Calendar Component */}
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500, marginTop: "20px" }}
//                     />
//                 </Card>
//             </Container>
//         </main>
//     );
// };

// export default AttendenceCalendar;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom"; // ✅ Get student_id from URL
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card } from "react-bootstrap";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction.js";

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const { student_id } = useParams(); // ✅ Extract student_id
//     const dispatch = useDispatch();
//     const attendenceData = useSelector((state) => state.attendence.Attendence_data);
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         if (student_id) {
//             const today = moment().format("YYYY-MM-DD");
//             dispatch(getAttendenceDataForCalendar(student_id, today));
//         }
//     }, [dispatch, student_id]);

//     useEffect(() => {
//         const newEvents = Object.entries(attendenceData).flatMap(([date, students]) =>
//             students[student_id]?.map((entry) => ({
//                 title: `${entry.destination} (${entry.attendence_time}) - ${entry.type}`,
//                 start: new Date(date),
//                 end: new Date(date),
//                 allDay: true,
//             })) || []
//         );

//         setEvents(newEvents);
//     }, [attendenceData, student_id]);

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Attendance Calendar</h3>

//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500, marginTop: "20px" }}
//                         views={["month"]}
//                         defaultView="month"
//                     />
//                 </Card>
//             </Container>
//         </main>
//     );
// };

// export default AttendenceCalendar;

// import React, { useEffect, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction";

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { student_id } = useParams(); // Get student_id from URL
//     const [selectedDate, setSelectedDate] = useState(null);

//     // Get attendance data from Redux
//     // const attendanceData = useSelector((state) => state.attendance.Attendence_data );
//     const attendanceData = useSelector((state) => state.attendance?.Attendence_data || []);


//     // Handle date selection in the calendar
//     const handleDateClick = (slotInfo) => {
//         const clickedDate = moment(slotInfo.start).format("YYYY-MM-DD");
//         setSelectedDate(clickedDate);
//         dispatch(getAttendenceDataForCalendar(student_id, clickedDate));
//     };

//     // Convert attendance data into calendar events
//     const events = selectedDate && attendanceData[selectedDate] ? [
//         ...attendanceData[selectedDate][student_id].map((entry, index) => ({
//             id: index + 1,
//             title: `${index + 1}. ${entry.destination} ${entry.type} ${entry.attendence_time}`,
//             start: new Date(selectedDate),
//             end: new Date(selectedDate),
//             allDay: true,
//         }))
//     ] : [];

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Calendar Component */}
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500, marginTop: "20px" }}
//                         views={["month"]}
//                         defaultView="month"
//                         selectable
//                         onSelectSlot={handleDateClick} // Handle date selection
//                     />
//                 </Card>
//             </Container>

//             {/* Floating Buttons */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Student List</Tooltip>}>
//                 <Button
//                     style={{ position: "fixed", bottom: "20px", left: "20px", backgroundColor: "#007bff" }}
//                     onClick={() => navigate("/attendencelist")}
//                 >
//                     <i className="bi bi-people"></i>
//                 </Button>
//             </OverlayTrigger>

//             <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
//                 <Button
//                     style={{ position: "fixed", bottom: "20px", right: "20px", backgroundColor: "#28a745" }}
//                     onClick={() => navigate("/attendence")}
//                 >
//                     <i className="bi bi-calendar-check"></i>
//                 </Button>
//             </OverlayTrigger>
//         </main>
//     );
// };

// export default AttendenceCalendar;


//==========================================================================================================
// MaIn
//=========================================================================

// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate(); // Initialize navigation

//     // Placeholder for events (Will replace this with attendance data)
//     const [events, setEvents] = useState([]);

//     // Styles for floating buttons
//     const styles = {
//         floatingButton: {
//             position: "fixed",
//             bottom: "20px",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             color: "white",
//             border: "none",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//             fontSize: "1.5rem",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "pointer",
//         },
//         studentListButton: {
//             left: "20px",
//             backgroundColor: "#007bff", // Blue
//         },
//         attendanceButton: {
//             right: "20px",
//             backgroundColor: "#28a745", // Green
//         },
//     };

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Calendar Component */}
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500, marginTop: "20px" }}
//                         views={["month"]} // Only allow Month view
//                         defaultView="month" // Set default view to Month
//                     />
//                 </Card>
//             </Container>

//             {/* Floating Student List Button (Left Bottom) */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Student List</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.studentListButton }}
//                     onClick={() => navigate("/attendencelist")}
//                 >
//                     <i className="bi bi-people"></i>
//                 </Button>
//             </OverlayTrigger>

//             {/* Floating Attendance Button (Right Bottom) */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.attendanceButton }}
//                     onClick={() => navigate("/attendence")}
//                 >
//                     <i className="bi bi-calendar-check"></i>
//                 </Button>
//             </OverlayTrigger>
//         </main>
//     );
// };

// export default AttendenceCalendar;

//=====================================================================================================

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction"; // Import the action

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { student_id } = useParams(); // Get student_id from URL
//     const attendenceData = useSelector((state) => state.attendence.Attendence_data);

//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         if (student_id) {
//             dispatch(getAttendenceDataForCalendar(student_id));
//         }
//     }, [dispatch, student_id]);

//     useEffect(() => {
//         if (attendenceData && attendenceData.length > 0) {
//             // Format and sort data
//             const formattedEvents = attendenceData
//                 .sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A")) // Sort by time
//                 .map((entry) => ({
//                     title: `${entry.destination} ${entry.attendence_time} ${entry.type}`,
//                     start: moment(entry.attendence_date, "DD-MM-YYYY").toDate(), // Convert to date format
//                     end: moment(entry.attendence_date, "DD-MM-YYYY").toDate(), // Same date for full-day event
//                 }));

//             setEvents(formattedEvents);
//         }
//     }, [attendenceData]);

//     const styles = {
//         floatingButton: {
//             position: "fixed",
//             bottom: "20px",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             color: "white",
//             border: "none",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//             fontSize: "1.5rem",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "pointer",
//         },
//         studentListButton: {
//             left: "20px",
//             backgroundColor: "#007bff",
//         },
//         attendanceButton: {
//             right: "20px",
//             backgroundColor: "#28a745",
//         },
//     };

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Calendar Component */}
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500, marginTop: "20px" }}
//                         views={["month"]}
//                         defaultView="month"
//                     />
//                 </Card>
//             </Container>

//             {/* Floating Student List Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Student List</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.studentListButton }}
//                     onClick={() => navigate("/attendencelist")}
//                 >
//                     <i className="bi bi-people"></i>
//                 </Button>
//             </OverlayTrigger>

//             {/* Floating Attendance Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.attendanceButton }}
//                     onClick={() => navigate("/attendence")}
//                 >
//                     <i className="bi bi-calendar-check"></i>
//                 </Button>
//             </OverlayTrigger>
//         </main>
//     );
// };

// export default AttendenceCalendar;

//===================================================================================================


// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction"; // Import the action

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { student_id } = useParams(); // Get student_id from URL
//     const attendenceData = useSelector((state) => state.attendence.Attendence_data);

//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         if (student_id) {
//             dispatch(getAttendenceDataForCalendar(student_id));
//         }
//     }, [dispatch, student_id]);

//     useEffect(() => {
//         if (attendenceData && attendenceData.length > 0) {
//             // Format and sort data
//             const formattedEvents = attendenceData
//                 .sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A")) // Sort by time
//                 .map((entry) => ({
//                     title: `${entry.destination}\n${entry.attendence_time} ${entry.type}`, // Add new line for better display
//                     start: moment(entry.attendence_date, "DD-MM-YYYY").toDate(), // Convert to date format
//                     end: moment(entry.attendence_date, "DD-MM-YYYY").toDate(), // Same date for full-day event
//                 }));

//             setEvents(formattedEvents);
//         }
//     }, [attendenceData]);

//     // Custom event component for better display
//     const CustomEvent = ({ event }) => {
//         return (
//             <center>
//             <div style={customEventStyle}>
//                 {event.title.split("\n").map((line, index) => (
//                     <div key={index}>{line}</div>
//                 ))}
//             </div>
//             </center>
//         );
//     };

//     // Styles
//     const styles = {
//         floatingButton: {
//             position: "fixed",
//             bottom: "20px",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             color: "white",
//             border: "none",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//             fontSize: "1.5rem",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "pointer",
//         },
//         studentListButton: {
//             left: "20px",
//             backgroundColor: "#007bff",
//         },
//         attendanceButton: {
//             right: "20px",
//             backgroundColor: "#28a745",
//         },
//         calendarContainer: {
//             height: "1500px", // Increase calendar height
//             marginTop: "20px",
//         },
//         monthRow: {
//             minHeight: "120px", // Increase row height for bigger boxes
//         },
//     };

//     const customEventStyle = {
//         backgroundColor: "rgba(0, 123, 255, 0.1)", // Light blue background
//         padding: "4px",
//         borderRadius: "4px",
//         fontSize: "14px",
//         whiteSpace: "pre-wrap", // Allow new lines
//         wordWrap: "break-word",
//         height: "auto", // Auto height
//         lineHeight: "1.2",
//     };

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Calendar Component */}
//                     <div style={styles.calendarContainer}>
//                         <Calendar
//                             localizer={localizer}
//                             events={events}
//                             startAccessor="start"
//                             endAccessor="end"
//                             views={["month"]}
//                             defaultView="month"
//                             components={{
//                                 event: CustomEvent, // Use custom event component
//                             }}
//                         />
//                     </div>
//                 </Card>
//             </Container>

//             {/* Floating Student List Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Student List</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.studentListButton }}
//                     onClick={() => navigate("/attendencelist")}
//                 >
//                     <i className="bi bi-people"></i>
//                 </Button>
//             </OverlayTrigger>

//             {/* Floating Attendance Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.attendanceButton }}
//                     onClick={() => navigate("/attendence")}
//                 >
//                     <i className="bi bi-calendar-check"></i>
//                 </Button>
//             </OverlayTrigger>
//         </main>
//     );
// };

// export default AttendenceCalendar;

//=================popup=======================

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction";

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { student_id } = useParams();
//     const attendenceData = useSelector((state) => state.attendence.Attendence_data);

//     const [events, setEvents] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedEvents, setSelectedEvents] = useState([]);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         if (student_id) {
//             dispatch(getAttendenceDataForCalendar(student_id));
//         }
//     }, [dispatch, student_id]);

//     useEffect(() => {
//         if (attendenceData && attendenceData.length > 0) {
//             // Group events by date
//             const groupedEvents = attendenceData.reduce((acc, entry) => {
//                 const dateKey = moment(entry.attendence_date, "DD-MM-YYYY").format("YYYY-MM-DD");
//                 if (!acc[dateKey]) acc[dateKey] = [];
//                 acc[dateKey].push(entry);
//                 return acc;
//             }, {});

//             // Format and sort events
//             const formattedEvents = Object.entries(groupedEvents).map(([date, entries]) => {
//                 entries.sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A"));

//                 const firstEvent = entries[0];
//                 const moreCount = entries.length - 1;

//                 return {
//                     title: moreCount > 0
//                         ? `${firstEvent.destination} ${firstEvent.attendence_time} ${firstEvent.type} (+${moreCount} more)`
//                         : `${firstEvent.destination} ${firstEvent.attendence_time} ${firstEvent.type}`,
//                     start: moment(date, "YYYY-MM-DD").toDate(),
//                     end: moment(date, "YYYY-MM-DD").toDate(),
//                     fullEvents: entries,
//                 };
//             });

//             setEvents(formattedEvents);
//         }
//     }, [attendenceData]);

//     // Function to handle clicking an event (opens modal)
//     const handleEventClick = (event) => {
//         setSelectedDate(moment(event.start).format("DD-MM-YYYY"));
//         setSelectedEvents(event.fullEvents);
//         setShowModal(true);
//     };

//     // Styles
//     const styles = {
//         floatingButton: {
//             position: "fixed",
//             bottom: "20px",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             color: "white",
//             border: "none",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//             fontSize: "1.5rem",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "pointer",
//         },
//         studentListButton: {
//             left: "20px",
//             backgroundColor: "#007bff",
//         },
//         attendanceButton: {
//             right: "20px",
//             backgroundColor: "#28a745",
//         },
//         calendarContainer: {
//             height: "600px",
//             marginTop: "20px",
//         },
//         monthRow: {
//             minHeight: "120px",
//         },
//     };

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Calendar Component */}
//                     <div style={styles.calendarContainer}>
//                         <Calendar
//                             localizer={localizer}
//                             events={events}
//                             startAccessor="start"
//                             endAccessor="end"
//                             views={["month"]}
//                             defaultView="month"
//                             onSelectEvent={handleEventClick} // Handle event click
//                         />
//                     </div>
//                 </Card>
//             </Container>

//             {/* Floating Student List Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Student List</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.studentListButton }}
//                     onClick={() => navigate("/attendencelist")}
//                 >
//                     <i className="bi bi-people"></i>
//                 </Button>
//             </OverlayTrigger>

//             {/* Floating Attendance Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.attendanceButton }}
//                     onClick={() => navigate("/attendence")}
//                 >
//                     <i className="bi bi-calendar-check"></i>
//                 </Button>
//             </OverlayTrigger>

//             {/* Modal for Showing Full Event List */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Attendance Details ({selectedDate})</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedEvents.map((event, index) => (
//                         <p key={index}>
//                             {event.destination} - {event.attendence_time} {event.type}
//                         </p>
//                     ))}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </main>
//     );
// };

// export default AttendenceCalendar;

//=================Main===========================================================================================




// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction"; // Import the action

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { student_id } = useParams(); // Get student_id from URL
//     const attendenceData = useSelector((state) => state.attendence.Attendence_data);

//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         if (student_id) {
//             dispatch(getAttendenceDataForCalendar(student_id));
//         }
//     }, [dispatch, student_id]);

//     useEffect(() => {
//         if (attendenceData && attendenceData.length > 0) {
//             // Format and sort data
//             const formattedEvents = attendenceData
//                 .sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A")) // Sort by time
//                 .map((entry) => {
//                     const arrowSymbol = entry.destination === "Home To School" ? "➡" : "⬅"; // Symbols
//                     return {
//                         title: `${arrowSymbol} ${entry.attendence_time} ${entry.type}`,
//                         start: moment(entry.attendence_date, "DD-MM-YYYY").toDate(), // Convert to date format
//                         end: moment(entry.attendence_date, "DD-MM-YYYY").toDate(), // Same date for full-day event
//                         type: entry.type,
//                     };
//                 });

//             setEvents(formattedEvents);
//         }
//     }, [attendenceData]);

//     // // Custom event component for better display
//     // const CustomEvent = ({ event }) => {
//     //     return (
//     //         <div style={{ ...customEventStyle, backgroundColor: getBackgroundColor(event.type) }}>
//     //             {event.title.split("\n").map((line, index) => (
//     //                 <div key={index}>{line}</div>
//     //             ))}
//     //         </div>
//     //     );
//     // };
//     // Custom event component for better display
//     const CustomEvent = ({ event }) => {
//         return (
//             <div style={{
//                 ...customEventStyle,
//                 backgroundColor: getBackgroundColor(event.type),
//                 border: "2px solid black", // Black border
//                 marginBottom: "5px", // Space below each event
//             }}>
//                 {event.title.split("\n").map((line, index) => (
//                     <div key={index}>{line}</div>
//                 ))}
//             </div>
//         );
//     };

//     // Function to get background color based on type
//     const getBackgroundColor = (type) => {
//         if (type === "IN") return "yellow";
//         if (type === "OUT") return "green";
//         if (type === "ABSENT") return "red";
//         return "white";
//     };

//     // Styles
//     const styles = {
//         floatingButton: {
//             position: "fixed",
//             bottom: "20px",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             color: "white",
//             border: "none",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//             fontSize: "1.5rem",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "pointer",
//         },
//         studentListButton: {
//             left: "20px",
//             backgroundColor: "#007bff",
//         },
//         attendanceButton: {
//             right: "20px",
//             backgroundColor: "#28a745",
//         },
//         calendarContainer: {
//             height: "1400px", // Increase calendar height
//             marginTop: "20px",
//         },
//         monthRow: {
//             minHeight: "120px", // Increase row height for bigger boxes
//         },
//     };

//     const customEventStyle = {
//         color: "black",
//         padding: "6px",
//         borderRadius: "6px",
//         fontSize: "14px",
//         fontWeight: "bold",
//         whiteSpace: "pre-wrap",
//         wordWrap: "break-word",
//         textAlign: "center",
//     };

//     return (
//         <main id="main" className="main">
//         <Container className="py-5">
//             <Card className="p-4 shadow">
//                 {/* Title with Legend */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <h3 className="text-center">Student Attendance Calendar</h3>

//                     {/* Legend Section */}
//                     <div style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "flex-start",
//                         border: "2px solid black",
//                         padding: "8px",
//                         borderRadius: "5px",
//                         fontSize: "14px",
//                         fontWeight: "bold"
//                     }}>
//                         <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
//                             <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px" }}>➡</span>
//                             Home To School
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                             <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px" }}>⬅</span>
//                             School To Home
//                         </div>
//                     </div>
//                 </div>

//                 {/* Calendar Component */}
//                 <div style={styles.calendarContainer}>
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         views={["month"]}
//                         defaultView="month"
//                         components={{
//                             event: CustomEvent, // Use custom event component
//                         }}
//                     />
//                 </div>
//             </Card>
//         </Container>

//             {/* Floating Student List Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Student List</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.studentListButton }}
//                     onClick={() => navigate("/attendencelist")}
//                 >
//                     <i className="bi bi-people"></i>
//                 </Button>
//             </OverlayTrigger>

//             {/* Floating Attendance Button */}
//             <OverlayTrigger placement="top" overlay={<Tooltip>Attendance</Tooltip>}>
//                 <Button
//                     style={{ ...styles.floatingButton, ...styles.attendanceButton }}
//                     onClick={() => navigate("/attendence")}
//                 >
//                     <i className="bi bi-calendar-check"></i>
//                 </Button>
//             </OverlayTrigger>
//             <style>
//                 {`
//                 .rbc-event {
//                         background-color: transparent !important;
//                         border: none !important;
//                     }
//                 .rbc-selected {
//                         background-color: transparent !important;
//                     }
//                 `}
//             </style>

//         </main>
//     );
// };

// export default AttendenceCalendar;


//=================================MAIN============================================================


import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Card, Button, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction"; // Import action
import { getStudentDataByBus } from "../../actions/StudentAction";

const localizer = momentLocalizer(moment);

const AttendenceCalendar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { student_id } = useParams(); // Get student_id from URL
    const attendenceData = useSelector((state) => state.attendence.Attendence_data);

    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAttendance, setSelectedAttendance] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (student_id) {
            dispatch(getAttendenceDataForCalendar(student_id));
            dispatch(getStudentDataByBus(student_id));
        }
    }, [dispatch, student_id]);

    useEffect(() => {
        if (attendenceData && attendenceData.length > 0) {
            // Format and sort data
            const formattedEvents = attendenceData
                .sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A"))
                .map((entry) => {
                    const arrowSymbol = entry.destination === "Home To School" ? "➡" : "⬅"; // Symbols
                    return {
                        title: `${arrowSymbol} ${entry.attendence_time} ${entry.type}`,
                        start: moment(entry.attendence_date, "DD-MM-YYYY").toDate(),
                        end: moment(entry.attendence_date, "DD-MM-YYYY").toDate(),
                        type: entry.type,
                        fullDate: entry.attendence_date, // Store date for filtering
                        rawData: entry, // Store full entry
                    };
                });

            setEvents(formattedEvents);
        }
    }, [attendenceData]);

    // Handle clicking on a date box
    const handleDateClick = (date) => {
        const formattedDate = moment(date).format("DD-MM-YYYY"); // Format selected date
        const filteredAttendance = attendenceData.filter((entry) => entry.attendence_date === formattedDate);

        setSelectedDate(formattedDate);
        setSelectedAttendance(filteredAttendance);
        setShowModal(true);
    };

    // Close modal
    const handleClose = () => setShowModal(false);

    // Function to get background color based on type
    const getBackgroundColor = (type) => {
        if (type === "IN") return "yellow";
        if (type === "OUT") return "green";
        if (type === "ABSENT") return "red";
        return "white";
    };

    // Custom event component for better display
    const CustomEvent = ({ event }) => {
        return (
            <div style={{
                ...customEventStyle,
                backgroundColor: getBackgroundColor(event.type),
                border: "1px solid black",
                marginBottom: "5px",
            }}>
                {event.title.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        );
    };

    // Styles
    const styles = {
        calendarContainer: {
            height: "1200px",
            marginTop: "20px",
        },
    };

    const customEventStyle = {
        color: "black",
        padding: "6px",
        borderRadius: "6px",
        fontSize: "11.5px",
        fontWeight: "bold",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        textAlign: "center",
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

    const studentListTooltip = (props) => <Tooltip {...props}>Student List</Tooltip>;
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
                    {/* Title with Legend */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Header with Student Name and ID */}
                        <h3 className="text-center">
                            Student Attendence Calendar
                        </h3>

                        {/* Legend Section */}
                        <div style={{
                            backgroundColor: "lightgrey",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            border: "2px solid black",
                            padding: "8px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            fontWeight: "bold"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px", backgroundColor: "white" }}>➡</span>
                                Home To School
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px", backgroundColor: "white" }}>⬅</span>
                                School To Home
                            </div>
                        </div>
                    </div>

                    {/* Calendar Component */}
                    <div style={styles.calendarContainer}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            views={["month"]}
                            defaultView="month"
                            selectable={true} // Enable date selection
                            onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)} // Open popup when clicking on a date
                            onSelectEvent={(event) => handleDateClick(event.start)}
                            components={{ event: CustomEvent }} // Use custom event component
                        />
                    </div>
                </Card>
            </Container>

            {/* Popup Modal for Attendance Details */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Attendance Details ({selectedDate})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAttendance.length > 0 ? (
                        selectedAttendance.map((record, index) => (
                            <p key={index}>
                                {record.destination} - {record.attendence_time} - {record.type}
                            </p>
                        ))
                    ) : (
                        <p>No attendance records for this date.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Floating Back Button */}
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

            {/* CSS Fix for Transparent Events */}
            <style>
                {`
                .rbc-event {
                    background-color: transparent !important;
                    border: none !important;
                }
                .rbc-selected {
                    background-color: transparent !important;
                }
                `}
            </style>
        </main >
    );
};

export default AttendenceCalendar;
