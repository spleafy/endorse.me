import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";

const validateUsername = async (req: Request, res: Response) => {
  const username: string | undefined = req.query.username?.toString();

  const user = await User.findOne({ username: username });

  if (user) {
    res.json(new ResponseMessage(200, { registered: true }));
  } else {
    res.json(new ResponseMessage(200, { registered: false }));
  }
};

export default validateUsername;
