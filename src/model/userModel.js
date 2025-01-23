import userSchema from "../schema/user.js";
import mongoose from "mongoose";

const user = mongoose.model("User", userSchema);

export default user;
