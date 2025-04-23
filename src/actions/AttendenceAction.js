import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const getAllAttendenceData = () => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.get(`${BASE_URL}attendence/viewdata`)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data;
                    dispatch({ type: "STORE_ATTENDENCE_DATA", "payload": { "data": json["Attendence_data"] } });
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};

// export const insertAttendence = (formData) => {
//     return (dispatch) => {
//         console.log("Sending data to backend:", formData); // Debugging log
//         return axios.post(`${BASE_URL}attendence/insertdata`, formData)
//             .then((response) => {
//                 if (response.status === 200) {
//                     var json = response.data;
//                     if (json["status"] === true) {
//                         alert(json["message"]);
//                         dispatch(getAllAttendenceData());
//                         return json; // Return response to handle errors properly
//                     } else {
//                         alert(json["message"]);
//                         return json;
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error during the insert:", error);
//                 alert("There was an error during insertion. Please try again.");
//                 return { status: false, message: "Insertion failed" };
//             });
//     };
// };

// export const getAttendanceType = (students, setAttendanceStatus, destination) => {
//     return async (dispatch) => {
//         let updatedStatus = {};

//         const requests = students.map((student) =>
//             axios
//                 .post(`${BASE_URL}attendence/gettype/${student.student_id}`, { destination }) // Pass destination
//                 .then((response) => {
//                     if (response.status === 200 && response.data.status) {
//                         updatedStatus[student.student_id] = response.data.nextType; // Store last type from DB
//                     }
//                 })
//                 .catch((error) => {
//                     console.log("Error :",error);
//                     alert("Error :",error);
//                 })
//         );

//         Promise.all(requests).then(() => {
//             setAttendanceStatus(updatedStatus);
//         });
//     };
// };

// export const markAbsentStudents = (busId, destination) => {
//     return (dispatch) => {
//         return axios.post(`${BASE_URL}attendence/insertabsent`, { bus_id: busId, destination })
//             .then((response) => {
//                 if (response.status === 200) {
//                     const json = response.data;
//                     alert(json["message"]); // Show alert with response message

//                     if (json["status"] === true) {
//                         dispatch(getAllAttendenceData()); // Refresh attendance data
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error marking absent students:", error);
//                 alert("There was an error marking absent students. Please try again.");
//             });
//     };
// };

// export const checkAttendanceCompletion = (busId, destination) => {
//     return (dispatch) => {
//         return axios.post(`${BASE_URL}attendence/checkattendencecount`, { bus_id: busId, destination })
//             .then((response) => {
//                 if (response.status === 200) {
//                     return response.data.completedStudents; // Returns an array of student IDs who have 2 entries
//                 }
//                 return [];
//             })
//             .catch((error) => {
//                 console.error("Error checking attendance completion:", error);
//                 return [];
//             });
//     };
// };

// export const insertAttendanceHomeToSchoolIN = (student_id, bus_id) => {
//     return (dispatch) => {
//         const formData = { student_id, bus_id };

//         console.log("Sending Attendance IN Data:", formData); // Debugging log

//         return axios.post(`${BASE_URL}attendence/inserthometoschoolin`, formData)
//             .then((response) => {
//                 if (response.status === 200) {
//                     const json = response.data;
//                     if (json.status === true) {
//                         alert(json.message);
//                         dispatch(getAllAttendenceData()); // Refresh attendance data
//                         return json;
//                     } else {
//                         alert(json.message);
//                         return json;
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error marking attendance IN:", error);
//                 alert("There was an error marking attendance. Please try again.");
//                 return { status: false, message: "Error in marking attendance" };
//             });
//     };
// };

// export const insertAttendanceHomeToSchoolIN = (student_id, bus_id) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: "START" });

//             const formData = { student_id, bus_id };
//             const response = await axios.post(`${BASE_URL}attendence/inserthometoschoolin`, formData);

//             if (response.status === 200 && response.data.status) {
//                 alert(response.data.message); // ✅ Success message
//                 dispatch({ type: "END" });
//                 return response.data;
//             }

//             // Handle specific messages from backend queries
//             if (response.status === 400 && response.data.message) {
//                 alert(response.data.message); // ✅ Expected backend validation message
//                 dispatch({ type: "END" });
//                 return response.data;
//             }

//         } catch (error) {
//             console.error("Error inserting attendance:", error);

//             if (error.response && error.response.status === 500) {
//                 alert("Server error: Unable to process request."); // ✅ Catching backend failure
//             } else {
//                 alert("Unexpected error occurred. Please try again."); // ✅ Catch-all error
//             }

//             dispatch({ type: "END" });
//             return { status: false, message: "Request failed" };
//         }
//     };
// };

export const insertAttendanceHomeToSchoolIN = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/inserthometoschoolin`, formData);

            // ✅ Success case (200)
            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                // ✅ Fetch updated attendance immediately after insertion
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance:", error);

            // ✅ Handle expected 400 error messages
            if (error.response && error.response.status === 400 && error.response.data.message) {
                alert(error.response.data.message); // Show backend error message correctly
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            dispatch({ type: "END" });
            return { status: false, message: "Request failed" };
        }
    };
};

export const insertAttendanceHomeToSchoolOUT = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/inserthometoschoolout`, formData);

            // ✅ Success case (200)
            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                // ✅ Fetch updated attendance immediately after insertion
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (OUT):", error);

            // ✅ Handle expected 400 error messages
            if (error.response && error.response.status === 400 && error.response.data.message) {
                alert(error.response.data.message); // Show backend error message correctly
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            dispatch({ type: "END" });
            return { status: false, message: "Request failed" };
        }
    };
};

export const insertAttendanceHomeToSchoolABSENT = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/inserthometoschoolabsent`, formData);

            // ✅ Success case (200)
            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                // ✅ Fetch updated attendance immediately after insertion
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (ABSENT):", error);

            // ✅ Handle expected 400 error messages
            if (error.response && error.response.status === 400 && error.response.data.message) {
                alert(error.response.data.message); // Show backend error message correctly
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            dispatch({ type: "END" });
            return { status: false, message: "Request failed" };
        }
    };
};

export const insertAttendanceSchoolToHomeIN = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/insertschooltohomein`, formData);

            // ✅ Success case (200)
            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                // ✅ Fetch updated attendance immediately after insertion
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (School To Home - IN):", error);

            // ✅ Handle expected 400 error messages
            if (error.response && error.response.status === 400 && error.response.data.message) {
                alert(error.response.data.message); // Show backend error message correctly
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            dispatch({ type: "END" });
            return { status: false, message: "Request failed" };
        }
    };
};

export const insertAttendanceSchoolToHomeOUT = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/insertschooltohomeout`, formData);

            // ✅ Success case (200)
            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                // ✅ Fetch updated attendance immediately after insertion
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (School To Home - OUT):", error);

            // ✅ Handle expected 400 error messages
            if (error.response && error.response.status === 400 && error.response.data.message) {
                alert(error.response.data.message); // Show backend error message correctly
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            dispatch({ type: "END" });
            return { status: false, message: "Request failed" };
        }
    };
};

export const insertAttendanceSchoolToHomeABSENT = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/insertschooltohomeabsent`, formData);

            // ✅ Success case (200)
            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                // ✅ Fetch updated attendance immediately after insertion
                dispatch(getStudentAttendanceToday(student_id));
                
                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (School To Home - ABSENT):", error);

            // ✅ Handle expected 400 error messages
            if (error.response && error.response.status === 400 && error.response.data.message) {
                alert(error.response.data.message); // Show backend error message correctly
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            dispatch({ type: "END" });
            return { status: false, message: "Request failed" };
        }
    };
};

// Action to get today's attendance for a specific student
// export const getStudentAttendanceToday = (student_id) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: "START" });

//             const response = await axios.get(`${BASE_URL}attendence/getstudentattendancetoday/${student_id}`);

//             if (response.status === 200 && response.data.status) {
//                 dispatch({
//                     type: "STORE_ATTENDENCE_SINGLE",
//                     payload: { data: response.data.Attendence_data }
//                 });
//                 return response.data;
//             }
//         } catch (error) {
//             console.error("Error fetching student attendance:", error);

//             dispatch({
//                 type: "SHOW_ATTENDENCE_MESSAGE",
//                 payload: { message: "Failed to fetch attendance data" }
//             });

//             return { status: false, message: "Request failed" };
//         } finally {
//             dispatch({ type: "END" });
//         }
//     };
// };

export const getStudentAttendanceToday = (student_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });
            console.log(`Fetching attendance for student ID: ${student_id}`);

            const response = await axios.get(`${BASE_URL}attendence/getstudentattendancetoday/${student_id}`);
            console.log("API Response:", response.data);

            if (response.status === 200 && response.data.status) {
                dispatch({
                    type: "STORE_ATTENDENCE_SINGLE",
                    payload: { student_id, data: response.data.Attendence_data }
                });
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching student attendance:", error);
        } finally {
            dispatch({ type: "END" });
        }
    };
};

export const getAttendenceDataForCalendar = (student_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const response = await axios.post(`${BASE_URL}attendence/getattendencedataforcalendar/${student_id}`, {
                student_id                
            });

            if (response.status === 200 && response.data.status) {
                dispatch({
                    type: "STORE_ATTENDENCE_DATA_SINGLE",
                    payload: { student_id, data: response.data.Attendence_data }
                });
            }
        } catch (error) {
            console.error("Error fetching student attendance:", error);
        } finally {
            dispatch({ type: "END" });
        }
    };
};
