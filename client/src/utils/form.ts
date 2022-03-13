import { fetchBackendAsync } from "./api";

export const createFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
};

export const submitForm = async (
  values: any,
  path: string,
  token?: string | null
) => {
  const data = await fetchBackendAsync(
    `api/${path}`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    values
  );

  return data;
};
