import { createFormData } from "./form";

export const fetchBackendAsync = async (
  path: string,
  method?: string,
  headers?: any,
  body?: any
): Promise<any> => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/${path}`,
    {
      method: method ? method.toUpperCase() : "GET",
      headers: headers ? headers : {},
      body: body ? createFormData(body) : undefined,
    }
  );

  const data = await response.json();

  return data;
};

export const authToken = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    "api/user/validate/token",
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export const fecthLoggedUserData = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    "api/user/logged",
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export const fecthUserData = async (username: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user?username=${encodeURIComponent(username ? username : "")}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export const followUser = async (username: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/follow?username=${encodeURIComponent(username ? username : "")}`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { username }
  );

  return response;
};

export const unfollowUser = async (username: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/unfollow`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { username }
  );

  return response;
};

export const fetchUserFollowers = async (
  id: string,
  start: number = 0,
  limit: number = 10
) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/followers?id=${encodeURIComponent(id)}&start=${encodeURIComponent(
      start
    )}&limit=${encodeURIComponent(limit)}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export const fetchUserFollowing = async (
  id: string,
  start: number = 0,
  limit: number = 10
) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/following?id=${encodeURIComponent(id)}&start=${encodeURIComponent(
      start
    )}&limit=${encodeURIComponent(limit)}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export const updateUserAccountColor = async (color: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/settings/account/color`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { color }
  );

  return response;
};

export const updateUserThemeColor = async (color: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/settings/theme/color`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { color }
  );

  return response;
};

export const updateUserDarkTheme = async (toggled: boolean) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/settings/theme/dark`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { toggled }
  );

  return response;
};
