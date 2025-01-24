import express from "express";

import PostRouter from "./post-routes.js";
//import ImgRouter from "./img-router.js";
import UserRouter from "./user-router.js";

const router = express.Router();

router.use("/post", PostRouter);
//router.use("/img", ImgRouter);
router.use("/user", UserRouter);

export default router;
