const mongoose = require("mongoose");

const professorAnswerSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  course: { type: String, required: true },
  description: { type: String, required: false },
  similarityThreshold: { type: Number, default: 70 },
  plagiarismThreshold: { type: Number, default: 80 },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to GridFS file
  extractedText: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProfessorAnswer", professorAnswerSchema);
