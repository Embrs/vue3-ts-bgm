import type { AxiosRequestConfig } from "axios";

export const basic: AxiosRequestConfig = {
  method: "post",
  baseURL: "/api",
  transformRequest: [
    (data, headers) => {
      headers["Content-Type"] = "application/json";
      headers.Authorization = localStorage.getHash("token")
        ? `Bearer ${localStorage.getObjectHash("token").token}`
        : "";
      return data;
    }
  ],
  headers: {
    "Content-Type": "multipart/form-data"
  },
  // 攜帶憑證
  withCredentials: false,
  // 返回資料型別
  responseType: "json"
};
