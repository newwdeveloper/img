import AppError from "../utils/errors/AppError.js";
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // Create a document
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete a document by ID
  async destroy(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      if (!response) {
        throw new AppError("Resource not found", 404);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get a single document by ID
  async get(id) {
    try {
      const response = await this.model.findById(id);
      if (!response) {
        throw new AppError("Resource not found", 404);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get all documents
  async getAll() {
    try {
      const response = await this.model.find();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update a document by ID
  async update(id, data) {
    try {
      const response = await this.model.findByIdAndUpdate(id, data, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is run
      });
      if (!response) {
        throw new AppError("Resource not found", 404);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default CrudRepository;
