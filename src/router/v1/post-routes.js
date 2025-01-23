import express from "express";
import { PostController } from "../../controllers/index.js";

const router = express.Router();
router.post("/", PostController.CreatePost);

router.get("/", PostController.FindAllPost);
router.get("/:id", PostController.FindPost);

export default router;
