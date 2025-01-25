import { UserService } from "../service/index.js";
import { signupUserService } from "../service/userService.js";

async function FindUserByEmail(req, res) {
  try {
    const user = await UserService.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function FindAllUser(req, res) {
  try {
    const user = await UserService.findAllUsers();
    console.log("Users Retrieved:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in FindAllUser:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

const signupUser = async (req, res) => {
  try {
    // Create a new user
    const user = await UserService.signupUserService({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.log("Error:", err);

    // Check if the error is a validation error
    if (err.name === "ValidationError") {
      // Respond with validation errors
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(err.errors).map((e) => e.message), // Extract messages from errors
      });
    }
    if (err.message.includes("is already taken")) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // For other errors (e.g., server errors)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export default {
  FindUserByEmail,
  FindAllUser,
  signupUser,
};
