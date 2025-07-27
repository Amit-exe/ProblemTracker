import express from "express";
import problemCtrl from "../controllers/problem.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/problems")
  .get(problemCtrl.list)
  .post(authCtrl.requireSignin, problemCtrl.create);

router
  .route("/api/problems/:problemId")
  .get(problemCtrl.problemByID)
  .put(authCtrl.requireSignin, problemCtrl.update)
  .delete(authCtrl.requireSignin, problemCtrl.remove);

router.param("problemId", problemCtrl.problemByID);

export default router;
