import { ImageService, PostService } from "../service/index.js"; // Import the image upload service

// Async function to handle image upload

async function UploadImage(req, res) {
  try {
    if (req.file) {
      const result = await ImageService.UploadImg(req.file); // Upload the image using the service

      res.status(200).json({
        message: "Image uploaded successfully!",
        url: result.url, // Cloudinary URL of the uploaded image
      });
    } else {
      res.status(400).json({ error: "No file uploaded" }); // No file found in the request
    }
  } catch (error) {
    console.error("Error in image upload:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

export default {
  UploadImage,
};
