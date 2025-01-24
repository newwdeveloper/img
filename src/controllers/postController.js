import { PostService, ImageService } from "../service/index.js";

async function CreatePost(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    console.log("Uploading file:", req.file);
    const imageUrl = await ImageService.UploadImg(req.file);
    console.log("Uploaded Image URL:", imageUrl.secure_url);
    console.log("Image upload response:", imageUrl);
    const post = await PostService.CreatePost({
      caption: req.body.caption,
      image: imageUrl.url,
      user: req.body.user,
    });
    console.log("Creating post with data:", {
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
    const post = await PostService.FindAll();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in findPost:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the post" });
  }
}

export default { CreatePost, FindPost, FindAllPost };
