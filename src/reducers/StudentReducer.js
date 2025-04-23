const initialState = {
    "Student_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const StudentReducer = (state = initialState, action) => {
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
        case "STORE_STUDENT_DATA":
            return {
                ...state,
                "Student_data": action.payload.data,
                "loading": false
            };
        case "SHOW_STUDENT_MESSAGE":
            return {
                ...state,
                "message": action.payload.message,
            };
        case "STORE_STUDENT_SINGLE":
            return {
                ...state,
                "single": action.payload.data,
                "loading": false
            };
        default:
            return state;
    }
};

export default StudentReducer;