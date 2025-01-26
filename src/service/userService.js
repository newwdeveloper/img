import { UserRepository } from "../repository/index.js";
import bcrypt from "bcrypt";
import { generateJWTTocken } from "../utils/jwt.js";
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
    console.log("Looking for user with email:", email);
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
export const signinUser = async (userDetail) => {
  try {
    //1 check is there valid registered user with email
    const user = await userRepository.findUserByEmail(userDetail.email);
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }
    //2.compare the password
    const isPasswordValid = bcrypt.compareSync(
      userDetail.password,
      user.password
    );
    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "invalid Password",
      };
    }
    const tocken = generateJWTTocken({
      email: user.email,
      password: user.password,
      _id: user._id,
      userName: user.userName,
    });
    return tocken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  signupUserService,
  signinUser,
  findUserById,
  findAllUsers,
  findUserByEmail,
  deleteUser,
};
