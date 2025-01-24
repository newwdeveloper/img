import { PostRepository } from "../repository/index.js";
import AppError from "../utils/errors/AppError.js";

const postRepository = new PostRepository();

async function CreatePost(data) {
  try {
    console.log("Post data being created:", data);
    const post = await postRepository.create(data); // Using 'create' from CrudRepository
    console.log("Post created:", post);
    return post;
  } catch (error) {
    console.error("Error in CreatePost:", error);
    throw error;
  }
}

async function FindPostById(id) {
  try {
    const response = await postRepository.get(id); // Correct: 'get' matches CrudRepository
    if (!response) {
      throw new AppError("Post not found", 404);
    }
    return response;
  } catch (error) {
    console.error("Error in FindPostById:", error);
    throw error;
  }
}

async function FindAll(offset, limit) {
  try {
    const sortOption = { createdAt: -1 };
    const response = await postRepository.sortPost(offset, limit, sortOption); // Correct: 'getAll' matches CrudRepository
    const totalDocuments = await postRepository.countAllPost();
    const totalPages = Math.ceil(totalDocuments / limit);
    return { response, totalDocuments, totalPages };
  } catch (error) {
    console.error("Error in FindAll:", error);
    throw error;
  }
}

async function DeletePost(id) {
  try {
    const response = await postRepository.destroy(id); // Correct: 'destroy' matches CrudRepository
    return response;
  } catch (error) {
    console.error("Error in DeletePost:", error);
    throw error;
  }
}

async function UpdatePost(id, data) {
  try {
    const update = await postRepository.update(id, data);
    return update;
  } catch (error) {
    console.error("Error in DeletePost:", error);
    throw error;
  }
}

export default { CreatePost, FindPostById, FindAll, DeletePost, UpdatePost };
