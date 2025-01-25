import { UserController } from "../../controllers/index.js";
import express from "express";
import { validate } from "../../validators/zodValidators.js";
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";

const router = express.Router();

router.get("/", UserController.FindAllUser);
router.get("/:email", UserController.FindUserByEmail);
router.post("/signup", validate(zodSignupSchema), UserController.signupUser);

export default router;
