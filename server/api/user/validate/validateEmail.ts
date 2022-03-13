import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";

const validateEmail = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.query.email });

  if (user) {
    res.json(new ResponseMessage(200, { registered: true }));
  } else {
    res.json(new ResponseMessage(200, { registered: false }));
  }
};

export default validateEmail;
