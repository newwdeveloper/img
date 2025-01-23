import { UserRepository } from "../repository/index.js";

const userRepository = new UserRepository();

/**
 * Create a new user
 */
async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}

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

export default {
  createUser,
  findUserById,
  findAllUsers,
  findUserByEmail,
  deleteUser,
};
