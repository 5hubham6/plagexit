// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Enable CORS and parse JSON bodies
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using .env variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/academic_integrity';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import API routes (we'll create these later)
const professorRouter = require('./routes/professor');
const studentRouter = require('./routes/student');

// Use the API routes
app.use('/api/professor', professorRouter);
app.use('/api/student', studentRouter);

module.exports = app;
