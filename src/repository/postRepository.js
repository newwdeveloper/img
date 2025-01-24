import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
  try {
    const newPost = await Post.create({ caption, image, user });
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export async function findAllPost() {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function findPostById(id) {
  try {
    const post = await Post.findOne({ id });
    if (!post) {
      // Throwing custom AppError if post is not found
      throw new AppError("Post not found", 404);
    }
    return post;
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (id) => {
  try {
    const response = await Post.findByIdAndDelete({ id });
    return response;
  } catch (error) {
    console.log(error);
  }
};
