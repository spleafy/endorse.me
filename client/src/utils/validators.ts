// Utils
import { fetchBackendAsync } from "./api";

export const emailBackend = async (
  value: string | undefined,
  checkRegistered: boolean
) => {
  if (value && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
    const data = await fetchBackendAsync(
      `api/user/validate/email?email=${encodeURIComponent(value)}`
    );

    if (!data.data.registered && checkRegistered) {
      return "This email is not registered!";
    } else if (data.data.registered && !checkRegistered) {
      return "This email is already registered!";
    }

    return null;
  }

  return null;
};

export const usernameBackend = async (
  value: string | undefined,
  checkRegistered: boolean
) => {
  if (value && value.length > 4 && /^[a-z0-9_-]{4,255}$/.test(value)) {
    const data = await fetchBackendAsync(
      `api/user/validate/username?username=${encodeURIComponent(value)}`
    );

    if (!data.data.registered && checkRegistered) {
      return "This username is not registered!";
    } else if (data.data.registered && !checkRegistered) {
      return "This username is already registered!";
    }

    return null;
  }

  return null;
};
