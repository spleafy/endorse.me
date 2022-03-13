import { Request, Response } from "express";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
import ResponseUser from "../../models/responseUser";

const fetchLoggedUserData = async (req: Request | any, res: Response) => {
  const user = await User.findOne({ _id: req.id });
  res.json(new ResponseMessage(200, new ResponseUser(user)));
};

export default fetchLoggedUserData;
