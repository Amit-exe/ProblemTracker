import express from "express";
import userStatsCtrl from "../controllers/userStats.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/user/stats")
  .get(authCtrl.requireSignin, userStatsCtrl.getStats);

router
  .route("/api/user/stats/heatmap")
  .get(authCtrl.requireSignin, userStatsCtrl.getHeatmapData);

export default router;
