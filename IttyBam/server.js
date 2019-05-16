const express = require("express");
const mongoose = require("mongoose");

const notes = require("./routes/api/notes");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const config = require("config");

const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB Congiguration
const db = config.get("mongoURI");

//Connect to Mongo
mongoose
  .connect(db, { userNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/notes", notes);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
