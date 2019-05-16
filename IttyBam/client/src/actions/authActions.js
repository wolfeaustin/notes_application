import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  SIGN_UP_USER
} from "./constants";
import axios from "axios";

export const authenticateUser = credentials => dispatch => {
  dispatch({ type: AUTHENTICATE_USER });
  axios
    .post("/api/auth", credentials)
    .then(res =>
      dispatch({
        type: AUTHENTICATE_USER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTHENTICATE_USER_ERROR,
        payload: err.response.data
      });
    });
};

export const signupUser = info => dispatch => {
  console.log(info, "info");
  axios
    .post("/api/users", info)
    .then(res =>
      dispatch({
        type: SIGN_UP_USER,
        payload: res.data
      })
    )
    .catch(err => console.log("Error signing up", err));
};
