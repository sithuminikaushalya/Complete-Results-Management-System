const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  try {
    const { studentId, firstName, lastName, email } = req.body;
    const newStudent = new Student({ studentId, firstName, lastName, email });
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
