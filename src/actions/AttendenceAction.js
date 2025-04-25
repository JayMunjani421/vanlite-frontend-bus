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

export const insertAttendanceHomeToSchoolIN = (student_id, bus_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const formData = { student_id, bus_id };
            const response = await axios.post(`${BASE_URL}attendence/inserthometoschoolin`, formData);

            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance:", error);

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


            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (OUT):", error);

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

            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (ABSENT):", error);

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

            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (School To Home - IN):", error);

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

            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                dispatch(getStudentAttendanceToday(student_id));

                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (School To Home - OUT):", error);

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

            if (response.status === 200 && response.data.status) {
                alert(response.data.message);
                dispatch(getStudentAttendanceToday(student_id));
                
                dispatch({ type: "END" });
                return response.data;
            }
        } catch (error) {
            console.error("Error inserting attendance (School To Home - ABSENT):", error);

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
