import jwt from"jsonwebtoken";
import { Error } from'../models/error.js';
import { Response } from'../models/response.js';

const config = process.env;

export const verifyToken = (req, res, next) => {

  const token =
    req.body?.token || req.query?.token || req.headers["x-access-token"] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send(
      Response("403", {}, Error("403", "A token is required for authentication")));
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(
      Response("401", {}, Error("401", err.message))
    )
  }
  
  return next();
};
