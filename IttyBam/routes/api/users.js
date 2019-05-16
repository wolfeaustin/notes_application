const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//  Users model
const User = require("../../models/User");

// @route POST api/users
// @desc Add a user
router.post("/", (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  //Simple Validation
  if (!first_name || !last_name || !email || !password) {
    // need to make all fields required
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing email
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({ first_name, last_name, email, password });

    // generate salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
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
  });
});

module.exports = router;
