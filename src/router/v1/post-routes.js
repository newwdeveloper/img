import express from "express";
import multer from "multer";
import { storage } from "../../config/cloudConfig.js";
import { PostController } from "../../controllers/index.js";
import { validate } from "../../validators/zodValidators.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { fileFormat } from "../../middleware/routerMiddleware.js";

const router = express.Router();
const upload = multer({ storage });

// Updated route to handle image upload and post creation
router.post(
  "/",

  upload.single("image"),
  fileFormat,
  validate(zodPostSchema),
  PostController.CreatePost
);

router.get("/", PostController.FindAllPost);
router.get("/:id", PostController.FindPost);
router.delete("/:id", PostController.deletePost);
router.patch("/:id", upload.single("image"), PostController.UpdatePost);

export default router;
