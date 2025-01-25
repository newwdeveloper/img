import user from "../model/userModel.js";
import CrudRepository from "./crudRepository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(user);
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

export default UserRepository;
