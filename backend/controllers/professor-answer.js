const ProfessorAnswer = require("../models/ProfessorAnswer");
const { processPDF } = require("../services/pdf-service");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

exports.uploadAnswerKey = async (req, res) => {
  try {
    // Validate file existence
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract form data
    const {
      assignmentName,
      course,
      description,
      similarityThreshold,
      plagiarismThreshold,
    } = req.body;

    // Process PDF content (extract text, etc.)
    const pdfText = await processPDF(req.file.path);

    // Save to database
    const newAnswerKey = await ProfessorAnswer.create({
      assignmentName,
      course,
      description,
      similarityThreshold,
      plagiarismThreshold,
      fileId: req.file.id, // Store the GridFS file ID
      extractedText: pdfText,
    });

    // Respond with success
    res.status(201).json({
      status: "success",
      data: newAnswerKey,
    });
  } catch (error) {
    logger.error(`Error uploading answer key: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Failed to upload answer key",
    });
  }
};
