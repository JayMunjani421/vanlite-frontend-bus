const initialState = {
    "Bus_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const BusReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                "islogin": true,
                "Bus_data": action.payload.data
            };
        case "LOGOUT":
            return {
                ...state,
                "islogin": false,
                "Bus_data": null
            };
        default:
            return state;
    }
};

export default BusReducer;