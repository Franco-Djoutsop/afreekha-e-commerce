import express, { Express } from "express";

const router = express.Router();

//client route
router.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});

export default router;
