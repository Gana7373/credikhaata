const sendSuccess = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  const sendError = (res, message, errors = [], statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  };
  
  module.exports = { sendSuccess, sendError };