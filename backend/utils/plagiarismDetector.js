// backend/utils/plagiarismDetector.js
class MinHash {
    constructor(numPermutations, seed = 42) {
      this.numPermutations = numPermutations;
      this.seed = seed;
      this.generators = this._generateGenerators();
    }
  
    _generateGenerators() {
      const generators = [];
      for (let i = 0; i < this.numPermutations; i++) {
        generators.push([this.seed + i, 1]);
      }
      return generators;
    }
  
    hash(shingles) {
      const minHashValues = new Array(this.numPermutations).fill(Infinity);
      
      for (const shingle of shingles) {
        for (let i = 0; i < this.numPermutations; i++) {
          const hashValue = this._hash(shingle, ...this.generators[i]);
          if (hashValue < minHashValues[i]) {
            minHashValues[i] = hashValue;
          }
        }
      }
      
      return minHashValues;
    }
  
    _hash(value, a, b) {
      return (a * value + b) % (2 ** 32);
    }
  }
  
  class LSH {
    constructor(numBands, numRowsPerBand) {
      this.numBands = numBands;
      this.numRowsPerBand = numRowsPerBand;
      this.signatureBuckets = new Map();
    }
  
    add(signature, id) {
      for (let i = 0; i < this.numBands; i++) {
        const band = signature.slice(i * this.numRowsPerBand, (i + 1) * this.numRowsPerBand);
        const bucketKey = JSON.stringify(band);
        
        if (!this.signatureBuckets.has(bucketKey)) {
          this.signatureBuckets.set(bucketKey, new Set());
        }
        
        this.signatureBuckets.get(bucketKey).add(id);
      }
    }
  
    query(signature) {
      const candidates = new Set();
      for (let i = 0; i < this.numBands; i++) {
        const band = signature.slice(i * this.numRowsPerBand, (i + 1) * this.numRowsPerBand);
        const bucketKey = JSON.stringify(band);
        
        if (this.signatureBuckets.has(bucketKey)) {
          for (const candidate of this.signatureBuckets.get(bucketKey)) {
            candidates.add(candidate);
          }
        }
      }
      
      return Array.from(candidates);
    }
  }
  
  exports.detectPlagiarism = async (submissions) => {
    const minHash = new MinHash(100);
    const lsh = new LSH(20, 5);
    const shinglingSize = 3;
    
    const submissionData = [];
    
    // Create signatures for all submissions
    for (const submission of submissions) {
      const shingles = exports.createShingles(submission.text, shinglingSize);
      const signature = minHash.hash(shingles);
      lsh.add(signature, submission.id);
      submissionData.push({ id: submission.id, shingles, signature, text: submission.text });
    }
    
    const cheatingPairs = new Set();
    
    // Compare each submission with its candidate matches
    for (const { id, signature, shingles, text } of submissionData) {
      const candidates = lsh.query(signature);
      for (const candidateId of candidates) {
        if (id !== candidateId && !cheatingPairs.has(`${candidateId}-${id}`)) {
          const candidateIndex = submissionData.findIndex(s => s.id === candidateId);
          const similarity = exports.jaccardSimilarity(new Set(shingles), new Set(submissionData[candidateIndex].shingles));
          if (similarity > 0.9) {
            cheatingPairs.add(`${id}-${candidateId}`);
          } else if (similarity > 0.6) {
            const cosineSimilarity = await exports.calculateCosineSimilarity(text, submissionData[candidateIndex].text);
            if (cosineSimilarity > 0.7) {
              cheatingPairs.add(`${id}-${candidateId}`);
            }
          }
        }
      }
    }
    
    return Array.from(cheatingPairs);
  };
  
  exports.createShingles = (text, size) => {
    const words = text.split(/\s+/);
    const shingles = [];
    
    for (let i = 0; i <= words.length - size; i++) {
      shingles.push(words.slice(i, i + size).join(' '));
    }
    
    return shingles;
  };
  
  exports.jaccardSimilarity = (setA, setB) => {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    
    return intersection.size / union.size;
  };
  
  exports.calculateCosineSimilarity = async (text1, text2) => {
    const combinedText = text1 + ' ' + text2;
    const words = new Set(combinedText.toLowerCase().match(/\b\w+\b/g));
    
    const vector1 = Array.from(words, word => text1.toLowerCase().split(word).length - 1);
    const vector2 = Array.from(words, word => text2.toLowerCase().split(word).length - 1);
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      normA += vector1[i] * vector1[i];
      normB += vector2[i] * vector2[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  };
  