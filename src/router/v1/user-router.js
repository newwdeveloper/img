import { UserController } from "../../controllers/index.js";
import express from "express";
import { validate } from "../../validators/zodValidators.js";
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";
import { isAuthenticated } from "../../middleware/jwtMiddleware.js";

const router = express.Router();

router.get("/", UserController.FindAllUser);
router.get("/:email", isAuthenticated, UserController.FindUserByEmail);
router.post("/signup", validate(zodSignupSchema), UserController.signupUser);
router.post("/signin", validate(zodSigninSchema), UserController.signinUser);

export default router;
