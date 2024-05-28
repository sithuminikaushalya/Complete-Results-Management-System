const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Route to add a new result
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body); 
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating result:', error); 
    res.status(500).json({ error: error.message });
  }
});


// Route to update a result by registration number
router.put('/:registrationNumber', async (req, res) => {
  try {
    const result = await Result.findOneAndUpdate(
      { registrationNumber: req.params.registrationNumber },
      req.body,
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a result by registration number
router.delete('/:registrationNumber', async (req, res) => {
  try {
    await Result.findOneAndDelete({ registrationNumber: req.params.registrationNumber });
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
