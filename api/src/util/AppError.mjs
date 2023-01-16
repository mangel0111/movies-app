class AppError extends Error {
  statusCode = 500;

  constructor(message, statusCode) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}

export default AppError;
