const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
const resultRoutes = require('./routes/result');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const dbName = 'result-management';
const mongoURI = `mongodb://127.0.0.1:27017/${dbName}`;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/auth', require('./routes/auth'));
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/result', resultRoutes);

mongoose.connect(mongoURI, {
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
