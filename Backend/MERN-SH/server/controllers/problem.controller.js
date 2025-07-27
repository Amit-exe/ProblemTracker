import Problem from "../models/problem.model.js";
import UserProblem from "../models/userProblem.model.js";
import extend from "lodash";
import errorHandler from "./../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  const problem = new Problem(req.body);
  problem.createdBy = req.auth._id;
  problem.isCustom = true; // Since user is creating it
  console.log(problem);

  try {
    console.log("here ");

    await problem.save();
    console.log("here too");

    return res.status(200).json({
      message: "Problem created successfully!",
      problem,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const problemByID = async (req, res, next, id) => {
  try {
    let problem = await Problem.findById(id);
    log(problem);
    if (!problem) {
      return res.status(400).json({
        error: "Problem not found",
      });
    }
    req.problem = problem;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve problem",
    });
  }
};

const read = (req, res) => {
  return res.json(req.problem);
};

const list = async (req, res) => {
  try {
    // Default to showing all problems, can be filtered later
    let problems = await Problem.find().select(
      "name difficulty link tags source"
    );
    res.json(problems);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  try {
    let problem = req.problem;
    // Prevent updating default problems unless admin
    if (!problem.isCustom && !req.auth.roles.includes("admin")) {
      return res.status(403).json({
        error: "Only admins can modify default problems",
      });
    }

    problem = extend(problem, req.body);
    problem.updatedAt = Date.now();
    await problem.save();
    res.json(problem);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let problem = req.problem;
    // Prevent deleting default problems unless admin
    if (!problem.isCustom && !req.auth.roles.includes("admin")) {
      return res.status(403).json({
        error: "Only admins can delete default problems",
      });
    }

    // Also remove all associated user problems
    await UserProblem.deleteMany({ problem: problem._id });
    await problem.remove();
    res.json({ message: "Problem deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  problemByID,
  read,
  list,
  remove,
  update,
};
