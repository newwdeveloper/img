import { ImageRepository } from "../repository/index.js";

const imgRepository = new ImageRepository();

async function UploadImg(file) {
  try {
    const img = await imgRepository.uploadImage(file);
    return img;
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
}

export default { UploadImg };
