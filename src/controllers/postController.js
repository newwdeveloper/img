import { PostService, ImageService } from "../service/index.js";
import { cloudinary } from "../config/cloudConfig.js";
import AppError from "../utils/errors/AppError.js";

async function CreatePost(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    console.log("Uploading file:", req.file);
    const imageUrl = await ImageService.UploadImg(req.file);
    console.log("Uploaded Image URL:", imageUrl.url);
    console.log("Image upload response:", imageUrl);
    const post = await PostService.CreatePost({
      caption: req.body.caption,
      image: imageUrl.url,
      user: req.body.user,
    });

    return res
      .status(201)
      .json({ success: true, message: "succesfully created post", data: post });
  } catch (error) {
    console.error("Error in CreatePost:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the post" });
  }
}
async function FindPost(req, res) {
  try {
    const { id } = req.params;
    const post = await PostService.FindPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Return the found post with a 200 status
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error in findPost:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the post" });
  }
}
async function FindAllPost(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;
    const { response, totalDocuments, totalPages } = await PostService.FindAll(
      offset,
      limit
    );
    res.status(200).json({
      posts: response,
      totalPosts: totalDocuments,
      totalPages,
      currentPage: Math.floor(offset / limit) + 1,
    });
  } catch (error) {
    console.error("Error in findPost:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the post" });
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await PostService.FindPostById(postId);

    if (!post) {
      throw new AppError(
        "Post not found, it may have already been deleted",
        404
      );
    }

    const publicId = post.image.split("/upload/")[1].split(".")[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary");
    await PostService.DeletePost(postId);
    console.log("Post deleted successfully");

    return res
      .status(200)
      .json({ message: "Post and image deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);

    // If the error is an instance of AppError, handle it properly
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.explanation, // Send the explanation from AppError
      });
    }

    // Handle other errors
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the post" });
  }
}

async function UpdatePost(req, res) {
  try {
    const { id } = req.params; // Extract post ID from URL
    const { caption } = req.body; // Extract caption from request body

    // Check if the post exists
    const existingPost = await PostService.FindPostById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Handle image update
    let newImageUrl = existingPost.image; // Default to the current image
    if (req.file) {
      // If a new image is uploaded
      const oldImagePublicId = existingPost.image
        .split("/upload/")[1]
        .split(".")[0];

      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(oldImagePublicId);
      console.log("Old image deleted from Cloudinary");

      // Upload the new image
      const newImage = await ImageService.UploadImg(req.file);
      newImageUrl = newImage.url;
      console.log("New image uploaded to Cloudinary:", newImageUrl);
    }

    // Prepare the updated data
    const updatedData = {
      caption: caption || existingPost.caption, // Use provided caption or retain the existing one
      image: newImageUrl, // Updated image URL or retain the old one
    };

    // Update the post in the database
    const updatedPost = await PostService.UpdatePost(id, updatedData);

    return res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error in UpdatePost:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the post" });
  }
}

export default { CreatePost, FindPost, FindAllPost, deletePost, UpdatePost };
