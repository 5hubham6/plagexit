// backend/models/StudentSubmission.js
const mongoose = require('mongoose');

const studentSubmissionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProfessorAnswer',
    required: true
  },
  pdfUrl: String,
  extractedText: String,
  similarityScore: Number,
  isFlagged: Boolean,
  feedback: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudentSubmission', studentSubmissionSchema);
