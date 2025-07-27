import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Problem name is required",
    trim: true,
  },
  difficulty: {
    type: String,
    required: "Difficulty is required",
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  link: {
    type: String,
    required: "Problem link is required",
    trim: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v);
      },
      message: "Please provide a valid URL",
    },
  },
  tags: {
    type: [String],
    default: [],
  },
  source: {
    type: String,
    default: "LeetCode",
  },
  sourceId: {
    type: String,
    trim: true,
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SH_User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Updated index definitions - separated text and compound indexes
ProblemSchema.index({ name: "text" }); // Text index only on name
// ProblemSchema.index({ tags: 1 }); // Standard index on tags
ProblemSchema.index({ difficulty: 1 }); // Standard index on difficulty
// ProblemSchema.index({ tags: 1, difficulty: 1 }); // Compound index for tag+difficulty queries

ProblemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Problem", ProblemSchema);
