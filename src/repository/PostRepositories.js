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
}

export default PostRepository;
