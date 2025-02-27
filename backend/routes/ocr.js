// backend/routes/ocr.js
router.post('/extract-text', upload.single('file'), async (req, res) => {
    const text = await extractTextFromPDF(req.file.path);
    res.json({ text });
  });