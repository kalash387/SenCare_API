// utils/responseHelper.js

// Send a success response
const sendSuccess = (res, statusCode, data) => {
    res.status(statusCode).json({
      status: 'success',
      data: data,
    });
  };
  
  // Send an error response
  const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({
      status: 'error',
      message: message,
    });
  };
  
  module.exports = { sendSuccess, sendError };