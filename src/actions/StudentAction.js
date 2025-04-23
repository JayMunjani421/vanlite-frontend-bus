import axios from "axios";
import { BASE_URL } from "../constants/constant";


export const getStudentDataByBus = (bus_id) => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.post(`${BASE_URL}student/viewstudentbybus`, { bus_id })
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data;
                    dispatch({ type: "STORE_STUDENT_DATA", "payload": { "data": json["Student_data"] } });
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};