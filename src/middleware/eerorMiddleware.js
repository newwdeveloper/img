// middlewares/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  if (err.message === "File type not supported") {
    return res.status(400).json({ message: err.message });
  }

  console.error(err.stack); // Log the error for debugging
  return res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
};

export default errorHandler;
