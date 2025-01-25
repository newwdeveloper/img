export const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Combine `req.body` and `req.file` for validation
      schema.parse({ ...req.body, image: req.file });
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.errors,
      });
    }
  };
};
