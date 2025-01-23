// routes/imageRoutes.js
import express from "express";
import multer from "multer";
import { storage } from "../../config/cloudConfig.js";
import { ImageController } from "../../controllers/index.js";

const router = express.Router();
const upload = multer({ storage });

// POST route to handle image upload
router.post("/upload", upload.single("image"), ImageController.UploadImage);

export default router;
