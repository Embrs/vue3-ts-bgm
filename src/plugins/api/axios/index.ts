import axios from "axios";
import fn from "./fn";
import { basic } from "./config";
import type { ResObject } from "./interface";
// import type { AxiosResponse } from "axios";
const axiosIns = axios.create(basic);

// 回傳攔截
axiosIns.interceptors.response.use(
  (response) => fn.HandleSuccessRes(response),
  (error) => fn.HandleErrorRes(error)
);

// ==============================================================================
// GetMethod
interface Params {
  [key: string]: any;
}
export const Get = (uri: string, Params: Params, useMask = false) => {
  if (useMask) {
    fn.ShowMask();
  }
  return new Promise<ResObject>((resolve) => {
    axiosIns.get(uri + fn.ToQuerystr(Params)).then((response: any) => resolve(response));
  });
};

// Post method
export const Post = (uri: string, Params: Params, useMask = false) => {
  if (useMask) {
    fn.ShowMask();
  }
  return new Promise<ResObject>((resolve) => {
    axiosIns.post(uri, JSON.stringify(Params)).then((response: any) => resolve(response));
  });
};

// Put method
export const Put = (uri: string, Params: Params, useMask = false) => {
  if (useMask) {
    fn.ShowMask();
  }
  return new Promise<ResObject>((resolve) => {
    axiosIns.put(uri, JSON.stringify(Params)).then((response: any) => resolve(response));
  });
};

// Delete method
export const Delete = (uri: string, Params: Params, useMask = false) => {
  if (useMask) {
    fn.ShowMask();
  }
  return new Promise<ResObject>((resolve) => {
    axiosIns.delete(uri + fn.ToQuerystr(Params)).then((response: any) => resolve(response));
  });
};
