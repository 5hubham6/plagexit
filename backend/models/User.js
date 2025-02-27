const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    role: { type: String, enum: ['student', 'professor'] },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
    createdAt: { type: Date, default: Date.now }
  });