import UserStats from "../models/userStats.model.js";
import errorHandler from "./../helpers/dbErrorHandler.js";

const getStats = async (req, res) => {
  try {
    const userId = req.auth._id;
    const stats = await UserStats.findOne({ user: userId })
      .select(
        "totalSolved easySolved mediumSolved hardSolved solveRate currentStreak longestStreak tagStats"
      )
      .exec();

    if (!stats) {
      // Return default stats if none exist
      return res.json({
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        solveRate: 0,
        currentStreak: 0,
        longestStreak: 0,
        tagStats: [],
      });
    }

    res.json(stats);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getHeatmapData = async (req, res) => {
  try {
    const userId = req.auth._id;
    const stats = await UserStats.findOne({ user: userId })
      .select("solvedDates")
      .exec();

    // Format data for calendar heatmap
    const heatmapData =
      stats?.solvedDates?.map((dateEntry) => ({
        date: dateEntry.date.toISOString().split("T")[0],
        count: dateEntry.count,
      })) || [];

    res.json(heatmapData);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  getStats,
  getHeatmapData,
};
