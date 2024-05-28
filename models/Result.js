const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  modules: [{
    name: {
      type: String,
      required: true
    },
    result: {
      type: String,
      required: true
    }
  }],
  gpa: {
    type: Number,
    required: true
  },
  sgpa: {
    type: Number,
    required: true
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;