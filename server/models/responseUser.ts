import { UserType } from "../types";

export default class ResponseUser {
  user: {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    friends: string[];
    followers: string[];
    following: string[];
    settings: {
      profileColor: string;
    };
    posts: [];
  } | null;

  constructor(user: {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    friends: string[];
    followers: string[];
    following: string[];
    settings: {
      profileColor: string;
    };
    posts: [];
  }) {
    if (user) {
      this.user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        friends: user.friends,
        followers: user.followers,
        following: user.following,
        settings: user.settings,
        posts: user.posts,
      };
    } else {
      this.user = null;
    }
  }

  getUser: any = () => {
    return {
      _id: this.user?._id,
      fullname: this.user?.fullname,
      email: this.user?.email,
      username: this.user?.username,
      friends: this.user?.friends,
      followers: this.user?.followers,
      following: this.user?.following,
      settings: this.user?.settings,
      posts: this.user?.posts,
    };
  };
}
