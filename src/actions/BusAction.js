import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const loginBus = (params, navigate) => {
    return (dispatch) => {
        console.log("Login params:", params);
        axios.post(`${BASE_URL}bus/loginbus`, params)
            .then((response) => {
                console.log("Login response:", response);
                if (response.status == 200) {
                    var json = response.data;
                    if (json["status"] == true) {
                        var message = json["message"];
                        alert(message);
                        sessionStorage.setItem("buslogin", true);
                        sessionStorage.setItem("token", json["access_token"]);
                        dispatch({ "type": "LOGIN", "payload": { "data": json["data"].bus || [] } });
                        console.log(sessionStorage.getItem("token"));
                        navigate("/attendence");
                    } else {
                        var message = json["message"];
                        alert(message);
                    }
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    };
};