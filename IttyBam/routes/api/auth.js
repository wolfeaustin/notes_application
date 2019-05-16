const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//  Users model
const User = require("../../models/User");

// @route POST api/auth
// @desc Authenticate a user
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    // make sure we have email and pass
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" }); //Need to change error code
    }

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600 // Only lasts an hour ***** may be a little out of scope
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, email: user.email } });
        }
      );
    });
  });
});

module.exports = router;
