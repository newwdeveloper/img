class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500; // Default to 500 if no status code is provided
    this.explanation = message || "An unknown error occurred";

    // Capture the stack trace if running in a Node.js environment
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
