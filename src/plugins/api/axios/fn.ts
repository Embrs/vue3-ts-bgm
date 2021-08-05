import type { AnyObject, ResObject } from "@/plugins/api/axios/interface";
import type { AxiosResponse } from "axios";
// import debounce from "lodash/debounce";
// import * as cookie from "@/plugins/cookie/fn.js";

// Get Store

// let store;
// if (process.browser) {
//   window.onNuxtReady(({ $store }) => {
//     store = $store;
//   });
// }
const errData: ResObject = {
  data: null,
  status: {
    err: 2,
    code: "",
    message: "",
    emessage: "",
    details: [],
    i18nMsg: ""
  }
};

// 遮罩
const ShowMask = () => {
  // if (store) {
  //   store.dispatch("action_globalMask", true);
  // }
};
const CloseMask = () => {
  // if (store) {
  //   store.dispatch("action_globalMask", false);
  // }
};

const Has = (object: AnyObject, key: string) => object != null && Object.hasOwnProperty.call(object, key);

// 回傳成功
const HandleSuccessRes = (response: AxiosResponse) => {
  CloseMask();
  // 基本框架驗證
  if (!Has(response, "data") || !Has(response.data, "status") || !Has(response.data.status, "code")) {
    // 資料格式異常
    return errData;
  }
  // ok
  response.data.status.err = Number(response.data.status.code.split("-")[0]);
  response.data.status.i18nMsg = "";
  // token 過期、登出
  if (`${response.data.status.code}` === "1-002-07-005") {
    // cookie.removeCookie("token");
    // cookie.removeCookie("member");
    // //
    // // response.data.status.err = "0";
    // setTimeout(() => {
    //   window.location.replace(window.location.origin + "/zh/signin");
    // }, 3000);
    return {
      data: null,
      status: errData
    };
  }
  // be fix err 攔截器

  return response.data;
};

// 回傳失敗
const HandleErrorRes = (error: Error) => {
  CloseMask();
  console.log("err", error);
  // 未知異常
  return errData;
};

// Object 轉換為 query
const ToQuerystr = (params: AnyObject) => {
  if (!params) return "";
  return `?${Object.entries(params)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&")}`;
};

// 轉換為FormData格式
const ToFormData = (params: AnyObject) => {
  const data = new FormData();
  Object.keys(params).forEach((key) => {
    if (isArray(params[key])) {
      if (params[key].length !== 0) params[key].forEach((v: any) => data.append(key, v));
    } else data.append(key, params[key]);
  });
  return data;
};

// 是否為 Array
const isArray = Array.isArray || ((arr) => Object.prototype.toString.call(arr) === "[object Array]");

export default {
  HandleSuccessRes,
  HandleErrorRes,
  ToQuerystr,
  ToFormData,
  ShowMask
};
