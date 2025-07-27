import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Tag name is required",
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  problemsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Tag", TagSchema);
