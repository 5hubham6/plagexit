// backend/services/ocrService.js
const { createWorker } = require('tesseract.js');
const worker = createWorker({ logger: m => console.log(m) });

async function extractTextFromImage(image) {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data } = await worker.recognize(image);
  await worker.terminate();
  return data.text;
}