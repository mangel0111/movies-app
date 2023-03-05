class ServiceResponse {
  constructor({ success, status, message, value }) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.value = value;
  }
}

export function ErrorResponse(message, status) {
  return new ServiceResponse({
    success: false,
    message,
    status,
  });
}

export function SuccessResponse(value, status = 200) {
  return new ServiceResponse({
    success: true,
    value,
    status,
  });
}
