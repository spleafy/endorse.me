import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

// Config
dotenv.config({});

const upload = multer();

const app: Application = express();

app.use(cors({}));

const PORT: string | number = process.env.PORT ?? 4000;

// mongoose.connect(
//   `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
// );

mongoose.connect(
  `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
);

// Middleware
import verifyToken from "./middleware/verifyToken";

// Validate Endpoints
import validateUsername from "./api/user/validate/validateUsername";
import validateEmail from "./api/user/validate/validateEmail";
import validateToken from "./api/user/validate/validateToken";

// Auth Endpoints
import authLogin from "./api/user/auth/authLogin";
import authRegisterInfluencer from "./api/user/auth/authRegisterInfluencer";
import authRegisterBusiness from "./api/user/auth/authRegisterBusiness";
import authForgot from "./api/user/auth/authForgot";
import authReset from "./api/user/auth/authReset";

// User Endpoints
import fetchUserData from "./api/user/fetchUserData";

// Auth Routes
app.post("/api/user/auth/login", upload.none(), authLogin);

app.post("/api/user/auth/register", upload.none(), authRegisterInfluencer);

app.post("/api/user/auth/forgot", upload.none(), authForgot);

app.post("/api/user/auth/reset", verifyToken, upload.none(), authReset);

// Validate Routes
app.get("/api/user/validate/username", validateUsername);

app.get("/api/user/validate/email", validateEmail);

app.get("/api/user/validate/token", verifyToken, validateToken);

// User Routes
app.get("/api/user", verifyToken, fetchUserData);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
