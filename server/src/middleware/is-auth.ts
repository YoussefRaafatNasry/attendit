import * as jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const auth: RequestHandler = (req, _, next) => {
  if (process.env.AUTH_USER_ID) {
    req.isAuth = true;
    req.userId = process.env.AUTH_USER_ID;
    next();
    return;
  }

  const authHeader = req.get("Authorization");
  const token = authHeader?.split(" ")[1];
  req.isAuth = false;

  if (token) {
    const decodedToken: any = jwt.verify(token, process.env.PRIVATE_KEY!);
    if (decodedToken) {
      req.isAuth = true;
      req.userId = decodedToken.userId;
    }
  }

  next();
};

export default auth;
