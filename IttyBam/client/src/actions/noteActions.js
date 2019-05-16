import { GET_NOTES, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "./constants";
import axios from "axios";

export const getNotes = () => dispatch => {
  axios.get("/api/notes").then(res =>
    dispatch({
      type: GET_NOTES,
      payload: res.data
    })
  );
};
export const addNote = note => dispatch => {
  axios.post("/api/notes", note).then(res =>
    dispatch({
      type: ADD_NOTE,
      payload: res.data
    })
  );
};
export const updateNote = note => dispatch => {
  console.log(note);
  axios.put(`/api/notes/${note._id}`, note).then(res =>
    dispatch({
      type: UPDATE_NOTE,
      payload: res.data
    })
  );
};
export const deleteNote = note => dispatch => {
  console.log(note);
  axios.delete(`/api/notes/${note._id}`, note).then(res =>
    dispatch({
      type: DELETE_NOTE,
      payload: res.data
    })
  );
};
