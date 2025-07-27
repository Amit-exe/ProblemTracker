import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root regardless of where app is run from
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log(process.env.MONGO_URI);

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGO_URI,
};

export default config;
