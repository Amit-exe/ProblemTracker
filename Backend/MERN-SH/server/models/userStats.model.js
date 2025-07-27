import mongoose from "mongoose";

const UserStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SH_User",
    required: true,
    unique: true,
  },
  totalSolved: {
    type: Number,
    default: 0,
  },
  easySolved: {
    type: Number,
    default: 0,
  },
  mediumSolved: {
    type: Number,
    default: 0,
  },
  hardSolved: {
    type: Number,
    default: 0,
  },
  solveRate: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  },
  // Track problems solved by date for streak calculation
  solvedDates: [
    {
      date: Date,
      count: Number,
    },
  ],
  // Track by tags for skill analysis
  tagStats: [
    {
      tag: String,
      solved: Number,
      total: Number,
    },
  ],
});

// Update stats when a problem is marked solved
UserStatsSchema.statics.updateStats = async function (
  userId,
  difficulty,
  increment = true
) {
  const update = {
    $inc: {
      totalSolved: increment ? 1 : -1,
      [`${difficulty.toLowerCase()}Solved`]: increment ? 1 : -1,
    },
    $set: { lastActive: new Date() },
  };

  return this.findOneAndUpdate({ user: userId }, update, {
    new: true,
    upsert: true,
  });
};

export default mongoose.model("UserStats", UserStatsSchema);
