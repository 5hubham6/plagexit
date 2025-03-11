// backend/routes/student.js
const express = require('express');
const router = express.Router();
const StudentSubmission = require('../models/StudentSubmission');
const ProfessorAnswer = require('../models/ProfessorAnswer');
const { extractTextFromPDF } = require('../utils/ocr');
const { calculateSimilarity } = require('../utils/similarityChecker');
const { detectPlagiarism } = require('../utils/plagiarismDetector');

// Submit Assignment
router.post('/submit-assignment', async (req, res) => {
  try {
    const { studentId, assignmentId, pdfData } = req.body;
    const pdfBuffer = Buffer.from(pdfData, 'base64');
    
    // Extract text from the PDF
    const extractedText = await extractTextFromPDF(pdfBuffer);
    
    // Retrieve the corresponding professor answer key
    const professorAnswer = await ProfessorAnswer.findById(assignmentId);
    if (!professorAnswer) {
      return res.status(404).json({ error: 'Professor answer not found' });
    }
    
    // Calculate similarity between the submission and the answer key
    const similarityScore = await calculateSimilarity(extractedText, professorAnswer.extractedText);
    
    // Flag the submission if the similarity is below the threshold
    const isFlagged = similarityScore < professorAnswer.similarityThreshold;
    
    // Save the submission
    const newSubmission = new StudentSubmission({
      studentId,
      assignmentId,
      extractedText,
      similarityScore,
      isFlagged
    });
    
    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Student Submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await StudentSubmission.find().populate('assignmentId');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detect Plagiarism
router.post('/detect-plagiarism', async (req, res) => {
  try {
    const { submissionIds } = req.body;
    
    // Retrieve submissions by their IDs
    const submissions = await StudentSubmission.find({ _id: { $in: submissionIds } });
    
    // Prepare submission data for plagiarism detection
    const submissionData = submissions.map(sub => ({
      id: sub._id.toString(),
      text: sub.extractedText
    }));
    
    // Run plagiarism detection
    const cheatingPairs = await detectPlagiarism(submissionData);
    
    res.json({ cheatingPairs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
