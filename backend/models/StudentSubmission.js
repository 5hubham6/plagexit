const SubmissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    pdfUrl: String,
    extractedText: String,
    similarityScore: Number,
    isFlagged: { type: Boolean, default: false },
    score: Number,
    createdAt: { type: Date, default: Date.now }
  });