import UserProblem from "../models/userProblem.model.js";
import UserStats from "../models/userStats.model.js";
import errorHandler from "./../helpers/dbErrorHandler.js";

const updateProblemStatus = async (req, res) => {
  try {
    const { problemId, status, notes, timeTaken, solutionLink } = req.body;
    const userId = req.auth._id;

    let userProblem = await UserProblem.findOneAndUpdate(
      { user: userId, problem: problemId },
      {
        status,
        notes,
        timeTaken,
        solutionLink,
        lastAttempted: Date.now(),
        $inc: { attemptCount: status === "Attempted" ? 1 : 0 },
        ...(status === "Solved" && { solvedDate: Date.now() }),
      },
      { new: true, upsert: true }
    ).populate("problem", "name difficulty");

    // Update stats if problem was solved
    if (status === "Solved") {
      await UserStats.updateStats(userId, userProblem.problem.difficulty);
    }

    res.json(userProblem);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getUserProblems = async (req, res) => {
  try {
    const { status, difficulty, tags } = req.query;
    const userId = req.auth._id;

    let query = { user: userId };
    if (status) query.status = status;

    let userProblems = await UserProblem.find(query)
      .populate("problem", "name difficulty link tags")
      .exec();

    // Apply additional filters if provided
    if (difficulty) {
      userProblems = userProblems.filter(
        (up) => up.problem.difficulty === difficulty
      );
    }
    if (tags) {
      const tagList = tags.split(",");
      userProblems = userProblems.filter((up) =>
        up.problem.tags.some((tag) => tagList.includes(tag))
      );
    }

    res.json(userProblems);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const toggleStarred = async (req, res) => {
  try {
    const { problemId } = req.body;
    const userId = req.auth._id;

    const userProblem = await UserProblem.findOneAndUpdate(
      { user: userId, problem: problemId },
      { $bit: { starred: { xor: 1 } } }, // Toggle boolean
      { new: true, upsert: true }
    );

    res.json(userProblem);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  updateProblemStatus,
  getUserProblems,
  toggleStarred,
};
