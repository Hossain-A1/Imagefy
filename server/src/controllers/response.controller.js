const successResponse = (
  res,
 { statusCode = 200,
  message = "Successfull",
  payload = {}}
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload,
  });
};

const errorResponse = (
  res,
  {statusCode = 500,
  message = "Internal server Error",}
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};


export {successResponse,errorResponse}