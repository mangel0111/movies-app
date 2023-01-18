class AppError extends Error {
  statusCode = 500;

  constructor(message: string, statusCode: number) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}

export default AppError;
