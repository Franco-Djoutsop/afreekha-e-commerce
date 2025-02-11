import express, { Express } from "express";
import { createUser } from "../controllers/userControler";

const router = express.Router();

//client route
router.route("/users").post(createUser);

export default router;
