const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Student = require('../models/Student');

// Fetch students based on department and semester
router.get('/students', async (req, res) => {
  try {
    const { department, semester } = req.query;
    const students = await Student.find({ department, semester }).populate('results');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new student
router.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student data
router.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
