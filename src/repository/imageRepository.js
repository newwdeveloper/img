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
    //return file; // The result is already stored in the file object by CloudinaryStorage
    if (!file) {
      throw new Error("No file provided.");
    }

    // Return the image URL stored in the file object after upload
    return {
      url: file.path, // file.path contains the secure_url after CloudinaryStorage upload
      public_id: file.filename, // file.filename holds Cloudinary's public ID
    };
  }
}

export default ImageRepository;
