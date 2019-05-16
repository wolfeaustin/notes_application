import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
// import { Login, SignUp, UserNotes } from "./Pages/";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserNotes from "./Pages/UserNotes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/user/:id" component={UserNotes} />
      </Router>
    </Provider>
  );
}

export default App;
