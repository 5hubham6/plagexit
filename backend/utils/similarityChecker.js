// backend/utils/similarityChecker.js

// Dummy similarity calculation
exports.calculateSimilarity = async (text1, text2) => {
    // For demonstration, simply return a fixed similarity score
    return 0.8;
  };
  
  exports.cosineSimilarity = (vecA, vecB) => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  };
  