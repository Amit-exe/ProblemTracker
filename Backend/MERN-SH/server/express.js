import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import userProblemRoutes from "./routes/userProblem.routes.js";
import userStatsRoutes from "./routes/userStats.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import { log } from "console";

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use((req, res, n) => {
  console.log(req.method, req.path);
  n();
});

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", problemRoutes);
app.use("/", userProblemRoutes);
app.use("/", userStatsRoutes);
app.use("/", tagRoutes);
// Catch unauthorised errors
app.use((err, req, res, next) => {
  console.log(req.body);

  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
