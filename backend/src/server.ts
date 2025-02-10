import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());

//connect to bd
connectDB();
//start server
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
