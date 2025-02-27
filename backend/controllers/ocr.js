// backend/controllers/ocr.js
const express = require('express');
const router = express.Router();
const { extractTextFromImage } = require('../services/ocrService');

// Configure multer for file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/extract-text', upload.single('pdf'), async (req, res) => {
  try {
    const text = await extractTextFromImage(req.file.path);
    res.json({ text });
  } catch (error) {
    res.status(500).send('OCR error');
  }
});