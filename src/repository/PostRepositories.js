import CrudRepository from "./crudRepository.js";
import post from "../model/postModel.js";

class PostRepository extends CrudRepository {
  constructor() {
    super(post);
  }
  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email }); // Use `this.model` instead of `this.post`
      return user;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      throw error;
    }
  }
  async countAllPost() {
    try {
      const count = await this.model
        .find()
        .sort({ createdAt: -1 })
        .countDocuments();
      return count;
    } catch (error) {
      console.error("Error in countPost:", error);
      throw error;
    }
  }
  async sortPost(offset, limit, sortOption) {
    try {
      const sort = await this.model
        .find() // Get all posts
        .sort(sortOption) // Sort by the provided option
        .skip(offset) // Apply offset for pagination
        .limit(limit); // Apply limit for pagination
      return sort;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }
}

export default PostRepository;
