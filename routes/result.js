const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Route to add a new result
router.post('/', async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a result by ID
router.put('/:registrationNumber', async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a result by ID
router.delete('/:registrationNumber', async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch results by department and semester
router.get('/:department/:semester', async (req, res) => {
  try {
    const results = await Result.find({ department: req.params.department, semester: req.params.semester });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
