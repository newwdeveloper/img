import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const allowedFormats = ["jpg", "png", "jpeg", "webp"]; // Allowed file types
    const fileFormat = file.mimetype.split("/")[1]; // Extract file extension

    if (!allowedFormats.includes(fileFormat)) {
      throw new Error("File type not supported"); // Throw error for unsupported files
    }

    return {
      folder: "uploads", // Folder name in Cloudinary
      allowed_formats: allowedFormats, // Enforce allowed formats in Cloudinary
    };
  },
});

export { cloudinary, storage };
