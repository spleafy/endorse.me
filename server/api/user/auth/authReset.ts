import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Types
import { UserType } from "../../../types";

const authReset = async (req: Request | any, res: Response) => {
  const id = req.id;

  const user: UserType | null = req.body
    ? await User.findOne({ _id: id })
    : null;

  if (user && req.body && req.body.password) {
    await User.findByIdAndUpdate(id, {
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.json(new ResponseMessage(200));
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default authReset;
