const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

router.post('/', async (req, res) => {
  try {
    const { studentId, subject, marks } = req.body;
    const newResult = new Result({ studentId, subject, marks });
    await newResult.save();
    res.status(201).json({ message: 'Result added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { subject, marks } = req.body;
    const result = await Result.findByIdAndUpdate(req.params.id, { subject, marks }, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
