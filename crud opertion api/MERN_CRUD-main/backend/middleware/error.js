const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error.";

  //wrong mongoDb id Error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT Error
  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid,Try again.`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expire Error
  if (err.name === "TokenExpiredError") {
    const message = `json web token is Expired,Try again.`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
