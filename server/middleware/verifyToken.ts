import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// Models
import ResponseMessage from "../models/responseMessage";

const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
  if (req.headers) {
    const token: any = req.headers["x-auth-token"];

    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET as string,
        (err: any, data: any) => {
          if (err) {
            res.json(new ResponseMessage(403));
          } else {
            req.id = data.id;
            next();
          }
        }
      );
    } else {
      res.json(new ResponseMessage(403));
    }
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default verifyToken;
