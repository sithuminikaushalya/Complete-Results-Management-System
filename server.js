const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
const resultRoutes = require('./routes/result');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/results', resultRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/student-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
