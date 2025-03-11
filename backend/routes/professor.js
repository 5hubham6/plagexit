// backend/routes/professor.js
const express = require('express');
const router = express.Router();
const ProfessorAnswer = require('../models/ProfessorAnswer');
const { extractTextFromPDF } = require('../utils/ocr');

// Upload Answer Key
router.post('/upload-answer-key', async (req, res) => {
  try {
    const { assignmentName, course, description, similarityThreshold, plagiarismThreshold } = req.body;
    const pdfBuffer = Buffer.from(req.body.pdfData, 'base64');
    
    // Extract text from the PDF
    const extractedText = await extractTextFromPDF(pdfBuffer);
    
    // Create and save the new answer key
    const newAnswerKey = new ProfessorAnswer({
      assignmentName,
      course,
      description,
      similarityThreshold: similarityThreshold || 0.7,
      plagiarismThreshold: plagiarismThreshold || 0.8,
      extractedText
    });
    
    const savedAnswerKey = await newAnswerKey.save();
    res.status(201).json(savedAnswerKey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Answer Keys
router.get('/answer-keys', async (req, res) => {
  try {
    const answerKeys = await ProfessorAnswer.find();
    res.json(answerKeys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
