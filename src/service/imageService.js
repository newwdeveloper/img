import { ImageRepository } from "../repository/index.js";

const imgRepository = new ImageRepository();

async function UploadImg(file) {
  try {
    console.log("Uploading image to repository:", file);
    const img = await imgRepository.uploadImage(file);
    console.log("Image upload result:", img);
    return img;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed: " + error.message);
  }
}

export default { UploadImg };
