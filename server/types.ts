import { IndexDirection } from "mongoose";

export interface UserType {
  _id: string | object | Buffer;
  fullname: string;
  email: string;
  username: string;
  password: string;
  friends: string[];
  followers: string[];
  following: string[];
  settings: {
    profileColor: string;
    themeColor: string;
    darkTheme: boolean;
  };
  posts: [];
}
