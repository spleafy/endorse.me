import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  password: String,
  friends: [String],
  followers: [String],
  following: [String],
  settings: {
    profileColor: String,
    themeColor: String,
    darkTheme: Boolean,
  },
  posts: Array,
});

const User = mongoose.model("User", userSchema);

export default User;
