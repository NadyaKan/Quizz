const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  let errormsg = "404 | Not found!";
  res.status(404).render("error", { err: errormsg });
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  let errormsg = "500 | Internal Error!";
  res.status(500).render("error", { err: errormsg });
};

exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};
