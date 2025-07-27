import express from "express";
import tagCtrl from "../controllers/tag.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/tags")
  .get(tagCtrl.list)
  .post(authCtrl.requireSignin, tagCtrl.create);

router
  .route("/api/tags/:tagName/problems")
  .get(authCtrl.requireSignin, tagCtrl.problemsByTag);

export default router;
