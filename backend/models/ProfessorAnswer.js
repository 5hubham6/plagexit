// backend/models/ProfessorAnswer.js
const mongoose = require('mongoose');

const professorAnswerSchema = new mongoose.Schema({
  assignmentName: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  description: String,
  similarityThreshold: {
    type: Number,
    default: 0.7
  },
  plagiarismThreshold: {
    type: Number,
    default: 0.8
  },
  extractedText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProfessorAnswer', professorAnswerSchema);
