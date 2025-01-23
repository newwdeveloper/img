import postSchema from "../schema/post.js";
import mongoose from "mongoose";

const post = mongoose.model("Post", postSchema);

export default post;
