import express from "express";
import userProblemCtrl from "../controllers/userProblem.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Protected routes - require authentication
router
  .route("/api/user/problems")
  .get(authCtrl.requireSignin, userProblemCtrl.getUserProblems);

router
  .route("/api/user/problems/status")
  .put(authCtrl.requireSignin, userProblemCtrl.updateProblemStatus);

router
  .route("/api/user/problems/star")
  .put(authCtrl.requireSignin, userProblemCtrl.toggleStarred);

export default router;
