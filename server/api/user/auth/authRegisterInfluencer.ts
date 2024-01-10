import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";
// Types
import { UserType } from "../../../types";

const authRegisterInfluencer = async (req: Request, res: Response) => {
  const user: UserType = req.body;
  if (user) {
    const colors: string[] = ["#ff33ff", "#cc0000", "#66ff33", "#9933cc"];

    user.password = await bcrypt.hash(user.password, 10);
    user.settings = { profileColor: "", themeColor: "blue", darkTheme: false };
    user.settings.profileColor =
      colors[Math.floor(Math.random() * colors.length) - 1];
    const createdUser = await new User(user).save();
    const token = jwt.sign(
      { id: createdUser._id },
      process.env.TOKEN_SECRET as string
    );
    res.json(
      new ResponseMessage(200, {
        user: new ResponseUser(createdUser as any),
        token,
      })
    );
  } else {
    res.json(new ResponseMessage(403, { user: null }));
  }
};

export default authRegisterInfluencer;
