import Tag from "../models/tag.model.js";
import Problem from "../models/problem.model.js";
import errorHandler from "./../helpers/dbErrorHandler.js";

const list = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ problemsCount: -1 });
    res.json(tags);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const create = async (req, res) => {
  const tag = new Tag(req.body);
  try {
    await tag.save();
    return res.status(200).json({
      message: "Tag created successfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const problemsByTag = async (req, res) => {
  try {
    const { tagName } = req.params;
    const userId = req.auth._id;

    // Get problems with this tag
    const problems = await Problem.find({ tags: tagName })
      .select("name difficulty link")
      .exec();

    // Get user's status for these problems
    const userProblems = await UserProblem.find({
      user: userId,
      problem: { $in: problems.map((p) => p._id) },
    }).exec();

    // Combine the data
    const result = problems.map((problem) => {
      const userProblem = userProblems.find((up) =>
        up.problem.equals(problem._id)
      );
      return {
        ...problem.toObject(),
        status: userProblem?.status || "Not Started",
        starred: userProblem?.starred || false,
      };
    });

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  list,
  create,
  problemsByTag,
};
