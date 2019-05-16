const express = require("express");
const router = express.Router();

//  Notes model
const Note = require("../../models/Note");

// @route GET api/notes
// @desc Get ALL notes
router.get("/", (req, res) => {
  Note.find()
    .sort({ date: -1 }) // sort by descending date
    .then(notes => res.json(notes));
});

// @route POST api/notes
// @desc Create a new Note
router.post("/", (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    description: req.body.description,
    active: true,
    created_by: req.body.created_by
  });

  newNote.save().then(note => res.json(note)); //persist and return
});

router.put("/:id", function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    if (err) {
      res.send(err);
    }
    note.title = req.body.title;
    note.description = req.body.description;
    note.updated_at = Date.now;
    note.save().then(note => res.json(note));
  });
});

// This is for 'restoring' a note, we are just changing it's status to active
router.post("/restore/:id", function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    if (err) {
      res.send(err);
    }
    note.active = true;

    note.save().then(note => res.json(note));
  });
});
// This is for 'deleting' a note, we are just changing it's status to inactive
router.delete("/:id", function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    if (err) {
      res.send(err);
    }
    note.active = false;

    note.save().then(note => res.json(note));
  });
});

// This is for 'sharing' a note, we are just adding the id of the person we want to
// share it with to the array shared_to
router.post("/share/:id", function(req, res) {
  Note.findById(req.params.id, function(err, note) {
    if (err) {
      res.send(err);
    }
    note.shared_to.push(req.body.user); //.ID maybe?

    note.save().then(note => res.json(note));
  });
});

// **** TODO
/*
    - Retrieve notes for a specific user
    - Change the active status
    - Share a note
    - Update a note and change the updated_at time
    - 
*/

// we are never really deleting a note, only moving the active status to false

// @route DELETE api/notes/:id
// @desc Create a new Note
// router.delete("/:id", (req, res) => {
//   Note.findById(req.params.id)
//     .then(note => note.remove().then(() => res.json({ succcess: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
