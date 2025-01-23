import { UserService } from "../service/index.js";

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
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in FindAllUser:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

export default {
  FindUserByEmail,
  FindAllUser,
};
