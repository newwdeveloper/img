import { PostService } from "../service/index.js";

async function CreatePost(req, res) {
  const { caption, image, user } = req.body;
  try {
    const post = await PostService.CreatePost({ caption, image, user });
    return res.status(201).json(post);
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
