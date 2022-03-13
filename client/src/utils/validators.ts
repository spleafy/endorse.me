// Utils
import { fetchBackendAsync } from "./api";

export const validateRequired = (value: string) => {
  if (!value) {
    return "This field is required!";
  }
};

export const validateMin = (
  value: string,
  length: number,
  fieldName: string
) => {
  if (value && value.length <= length) {
    return `${fieldName} has to be longer than ${length} characters!`;
  }
};

export const validateMax = (
  value: string,
  length: number,
  fieldName: string
) => {
  if (value && value.length > length) {
    return `${fieldName} has to be shorther than ${length} characters`;
  }
};

export const validateMatchBoth = (
  value: string,
  revalue: string,
  fieldName: string
) => {
  if (value !== revalue) {
    return `${fieldName} must match!`;
  }
};

export const validateEmailRegex = (value: string) => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
    return "This is not a valid email!";
  }
};

export const validateEmailBackend = async (
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
  }
};

export const validateUsernameRegex = (value: string) => {
  if (!/^[a-z0-9_-]{4,255}$/.test(value)) {
    return "This si not a valid username";
  }
};

export const validateUsernameBackend = async (
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
  }
};
