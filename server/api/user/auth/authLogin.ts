import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Types
import { UserType } from "../../../types";

const authLogin = async (req: Request, res: Response) => {
  const user: UserType | null = req.body
    ? await User.findOne({
        email: req.body.email,
      })
    : null;

  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_SECRET as string
      );
      res.json(new ResponseMessage(200, { sucessful: true, token }));
    } else {
      res.json(new ResponseMessage(400, { sucessful: false }));
    }
  } else {
    res.json(new ResponseMessage(400, { sucessful: false }));
  }
};

export default authLogin;
