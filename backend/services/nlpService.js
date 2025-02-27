// backend/services/nlpService.js
const axios = require('axios');

const NLP_URL = 'http://nlp-service:8000'; // Docker network

async function computeSimilarity(text1, text2) {
  const embeddings = await Promise.all([
    getEmbedding(text1),
    getEmbedding(text2)
  ]);
  return cosineSimilarity(embeddings[0], embeddings[1]);
}

async function getEmbedding(text) {
  try {
    const response = await axios.post(`${NLP_URL}/embed/`, { text });
    return response.data.embedding[0];
  } catch (error) {
    throw new Error('NLP service failed');  
  }
}