import { errorResponse } from "../controllers/response.controller.js";
import { verifyToken } from "../helpers/createJwtToken.js";

const isAuthorized = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return errorResponse(res, { statusCode: 404, message: "Token not found" });
  }

  try {
    const tokenDecode = verifyToken(token);

    if (tokenDecode?.id) {
      req.user = tokenDecode;
      next();
    } else {
      errorResponse(res, {
        statusCode: 404,
        message: "Not Authorized. Login again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { isAuthorized };
