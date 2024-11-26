const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  created: Date,
});
module.exports = mongoose.model("Student", studentSchema);
