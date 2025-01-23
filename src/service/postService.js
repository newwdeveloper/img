import { PostRepository } from "../repository/index.js";

const postRepository = new PostRepository();

async function CreatePost(data) {
  try {
    const post = await postRepository.create(data); // Using 'create' from CrudRepository
    return post;
  } catch (error) {
    console.error("Error in CreatePost:", error);
    throw error;
  }
}

async function FindPostById(id) {
  try {
    const response = await postRepository.get(id); // Correct: 'get' matches CrudRepository
    return response;
  } catch (error) {
    console.error("Error in FindPostById:", error);
    throw error;
  }
}

async function FindAll() {
  try {
    const response = await postRepository.getAll(); // Correct: 'getAll' matches CrudRepository
    return response;
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

export default { CreatePost, FindPostById, FindAll, DeletePost };
