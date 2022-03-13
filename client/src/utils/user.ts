import store from "../redux/store";
import { userSlice } from "../redux/userSlice";
// Utils
import { fecthLoggedUserData } from "./api";
import {
  followUser,
  unfollowUser,
  updateUserAccountColor,
  updateUserThemeColor,
  updateUserDarkTheme,
} from "./api";

export const updateUserData = async () => {
  const stateUser: any = store.getState().user.user;

  if (stateUser.username === undefined) {
    const response = await fecthLoggedUserData();
    store.dispatch(userSlice.actions.updateUser(response.data.user));
  }
};

export const followUserAndUpdate = async (username: string | undefined) => {
  const response = await followUser(username);
  store.dispatch(userSlice.actions.updateUser(response.data.loggedUser));
  return response;
};

export const unfollowUserAndUpdate = async (username: string | undefined) => {
  const response = await unfollowUser(username);
  store.dispatch(userSlice.actions.updateUser(response.data.loggedUser));
  return response;
};

export const updateUserProfileColorAndUpdate = async (color: string) => {
  const response = await updateUserAccountColor(color);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
};

export const updateUserThemeColorAndUpdate = async (color: string) => {
  const response = await updateUserThemeColor(color);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
};

export const updateUserDarkThemeAndUpdate = async (toggled: boolean) => {
  const response = await updateUserDarkTheme(toggled);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
};
