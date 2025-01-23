import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      minLength: 5,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //to store references to the User collection's documents, enabling easy relationship management
      ref: "User",
    },
  },
  { timestamps: true }
);

export default postSchema;
