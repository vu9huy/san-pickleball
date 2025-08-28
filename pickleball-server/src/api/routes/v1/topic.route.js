import express from "express";
import { topicController } from "../../controllers/index.js";

const router = express.Router();

router
    .route("/")
    .get(topicController.getTopics)
    .post(topicController.createTopic);

router
    .route("/:topicId")
    .get(topicController.getTopic)
    .patch(topicController.updateTopic)
    .delete(topicController.deleteTopic);

export default router;