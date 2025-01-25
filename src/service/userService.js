import { UserRepository } from "../repository/index.js";

const userRepository = new UserRepository();

/**
 * Create a new user
 */

/**
 * Find a user by ID
 */
async function findUserById(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    console.error("Error in findUserById:", error);
    throw error;
  }
}

/**
 * Find all users
 */
async function findAllUsers() {
  try {
    const users = await userRepository.getAll();
    return users;
  } catch (error) {
    console.error("Error in findAllUsers:", error);
    throw error;
  }
}

/**
 * Find a user by email
 */
async function findUserByEmail(email) {
  try {
    const user = await userRepository.findUserByEmail(email);
    return user;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
}

/**
 * Delete a user by ID
 */
async function deleteUser(id) {
  try {
    const deletedUser = await userRepository.destroy(id);
    return deletedUser;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
}

export const signupUserService = async (user) => {
  try {
    const newUser = await userRepository.create(user);
    console.log(newUser);
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; // Get the field that was duplicated (either 'userName' or 'email')
      const errorMessage = `${duplicateField} is already taken. Please choose another.`;
      throw new Error(errorMessage);
    }
    if (error.name === "ValidationError") {
      throw error; // Let the controller handle the validation errors
    } else {
      console.error(error);
      throw new Error("Server error");
    }
  }
};

export default {
  signupUserService,
  findUserById,
  findAllUsers,
  findUserByEmail,
  deleteUser,
};
