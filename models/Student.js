const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }]
});

module.exports = mongoose.model('Student', studentSchema);
