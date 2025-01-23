// repository/imageRepository.js
import { cloudinary } from "../config/cloudConfig.js";
import CrudRepository from "./crudRepository.js"; // Base repository, if applicable

class ImageRepository extends CrudRepository {
  constructor() {
    super(); // Initialize base repository, if applicable
  }

  // Remove manual upload and rely on CloudinaryStorage via Multer
  // The upload is handled by Multer and CloudinaryStorage
  async uploadImage(file) {
    console.log("Received file:", file);
    // Return file object which contains Cloudinary result after Multer's CloudinaryStorage upload
    return file; // The result is already stored in the file object by CloudinaryStorage
  }
}

export default ImageRepository;
