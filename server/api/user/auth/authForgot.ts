import { Request, Response } from "express";
import mail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Types
import { UserType } from "../../../types";

const authForgot = async (req: Request, res: Response) => {
  console.log(req.body);

  const user: UserType | null = req.body
    ? await User.findOne({ email: req.body.email })
    : null;

  if (user) {
    mail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET as string
    );

    const message = {
      to: user.email,
      from: "communitybuilderbot@outlook.com",
      subject: "Community Builder Password Change",
      text: `Change Password: ${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/auth/reset?token=${token}`,
      html: `<!DOCTYPE html><html lang="en"><head><style>body {font-family: Verdana, Geneva, Tahoma, sans-serif;display: block;}h1 {color: rgb(36, 40, 58);width: 100%;margin-bottom: 40px;}h2 {color: rgb(57, 59, 65);width: 100%;margin-bottom: 10px;font-size: 16pt;}h3 {color: rgb(70, 75, 97);width: 100%;font-size: 10pt;margin-bottom: 20px;}a {color: rgb(70, 75, 97);width: 100%;transition: color 0.2s ease-in-out;}a:hover {color: rgb(70, 75, 97);}</style></head><body><div><h1>Community Builder</h1><h2>Reset your password</h2><h3>By following this link you will be redirected to our reset page</h3><a href="${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/auth/reset?token=${token}">Reset Password</a></div></body></html>`,
    };

    const response = await mail.send(message);

    res.json(new ResponseMessage(response[0].statusCode));
  } else {
    res.json(new ResponseMessage(401));
  }
};

export default authForgot;
