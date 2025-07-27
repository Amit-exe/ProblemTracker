import mongoose from "mongoose";

const UserProblemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SH_User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "Attempted", "Solved"],
      default: "Not Started",
    },
    solvedDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    attemptCount: {
      type: Number,
      default: 0,
    },
    lastAttempted: {
      type: Date,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    timeTaken: {
      type: Number, // in minutes
    },
    solutionLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure one user-problem relationship
UserProblemSchema.index({ user: 1, problem: 1 }, { unique: true });

export default mongoose.model("UserProblem", UserProblemSchema);
