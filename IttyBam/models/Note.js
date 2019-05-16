const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//Create Schema
const NoteSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  active: {
    type: Boolean
  },
  created_by: {
    type: Object // Used to reference the User who created this note
  },
  shared_to: [
    {
      type: Object // Used to house all of the User this note has been shared with
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("note", NoteSchema);
