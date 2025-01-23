import user from "../model/userModel.js";
import CrudRepository from "./crudRepository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(user);
  }
}

export default UserRepository;
