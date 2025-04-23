const initialState = {
    "Attendence_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const AttendenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "START":
            return {
                ...state,
                "loading": true
            };
        case "END":
            return {
                ...state,
                "loading": false
            };
        case "STORE_ATTENDENCE_DATA":
            return {
                ...state,
                "Attendence_data": action.payload.data,
                "loading": false
            };
        case "SHOW_ATTENDENCE_MESSAGE":
            return {
                ...state,
                "message": action.payload.message,
            };
        // case "STORE_ATTENDENCE_SINGLE":
        //     console.log("Received attendance data in reducer:", action.payload.data);
        //     return {
        //         ...state,
        //         single: action.payload.data,
        //         loading: false
        //     };
        case "STORE_ATTENDENCE_SINGLE":
            // console.log("Received attendance data in reducer:", action.payload.data);
            return {
                ...state,
                single: {
                    ...state.single, // ✅ Preserve existing data
                    [action.payload.student_id]: action.payload.data // ✅ Store by student ID
                },
                loading: false
            };
        case "STORE_ATTENDENCE_DATA_SINGLE":
            // console.log("Attendance Data:", action.payload.data);
        return {
            ...state,
            Attendence_data: action.payload.data
        };
        default:
            return state;
    }
};

export default AttendenceReducer;