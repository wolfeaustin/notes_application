import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE
} from "../actions/constants";

const initialState = {
  notes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note._id == action.payload._id ? action.payload : note
        )
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note._id == action.payload._id
            ? { ...action.payload, active: false }
            : note
        )
      };
    default:
      return state;
  }
}
