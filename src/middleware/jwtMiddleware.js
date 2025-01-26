import { UserService } from "../service/index.js";
import { verifyJWT } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
  //check if jwt passed in header
  const token = req.headers["x-access-token"];
  console.log("Received token:", token);

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required",
    });
  }
  try {
    const response = verifyJWT(token);
    console.log("Decoded JWT response:", response);
    console.log("JWT Email:", response.email);

    const doesUserExists = await UserService.findUserByEmail(response.email);
    console.log("does user exist", doesUserExists);
    console.log("Database Email:", doesUserExists.email);

    if (!doesUserExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = response;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "tocken authentication failed",
    });
  }
};
