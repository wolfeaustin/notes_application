import { combineReducers } from "redux";
import noteReducer from "./noteReducer";
import authReducer from "./authReducer";

export default combineReducers({
  note: noteReducer,
  auth: authReducer
  //authReducer
});
