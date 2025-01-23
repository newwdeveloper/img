import { UserController } from "../../controllers/index.js";
import express from "express";

const router = express.Router();

router.get("/", UserController.FindAllUser);
router.get("/:email", UserController.FindUserByEmail);

export default router;
