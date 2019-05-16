import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  SIGN_UP_USER
} from "../actions/constants";

const initialState = {
  user: null,
  error: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: null,
        error: null,
        loading: true
      };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case AUTHENTICATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SIGN_UP_USER:
      // REDIRECT TO LOGIN
      document.location.replace("http://localhost:3000/login");
      console.log("success");
      return {
        ...state
      };

    default:
      return state;
  }
}
