import express from "express";
import gest_message from "../controllers/messageController";
const router = express.Router();

router.post("/addMessage", (req, res) => {
  gest_message.createMessage(req, res);
});

router.delete(
  "/deleteMessage/:id",
  (req: express.Request, res: express.Response) => {
    gest_message.deleteMessage(req, res);
  }
);

router.get(
  "/userMessage/:id",
  (req: express.Request, res: express.Response) => {
    gest_message.getMessage(req, res);
  }
);
export default router;
