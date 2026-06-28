export const errorHandler = (statusCode,messgae) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  return error;
};