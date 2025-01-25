import multer from "multer";
export const fileFormat = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  next(err); // Pass non-multer errors to the global error handler
};
