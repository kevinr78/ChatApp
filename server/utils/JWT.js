import jwt from "jsonwebtoken";

let token;
const verifyjwt = (req, res, next) => {
  let err;
  try {
    debugger;
    token = req.header("Authorization").split(" ")[1];

    let verifiedtoken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verifiedtoken) {
      err = new Error("Not Authorized");
      err.status = 401;
      err.ok = false;
      throw err;
    }
    req.currentuser = verifiedtoken;
    next();
  } catch (error) {
    next(err);
  }
};

const hasJWTExpired = (req, res, next) => {
  let err;
  let tokenTimeStamp = jwt.decode(token).exp;
  let currentTime = Date.now() / 1000; //convert to seconds

  try {
    if (isNaN(tokenTimeStamp) || tokenTimeStamp < currentTime) {
      err = new Error("Token Expired");
      err.status = 498;
      err.message = "Your session has expired. please login again";
      throw err;
    }

    next();
  } catch (error) {
    next(error);
  }
};
export { verifyjwt, hasJWTExpired };
