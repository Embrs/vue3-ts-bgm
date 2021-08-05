import type { RouteRecordRaw } from "vue-router";
import store from "@/store";

const pagePath = store.getters["Router/pagePath"];
// 登出
const ToSignOut = (next: any) => {
  // 保存暫存帳號
  // const accountInfo = getCookieObject(window.accountInfo);
  // removeAllCookies();
  // if (!isEmpty(accountInfo)) {
  //   setCookieObject(window.accountInfo, accountInfo);
  // }
  // 前往登入頁面
  next("/login");
};

// 訪問第一頁
const ToFirstPage = (routers: Array<RouteRecordRaw>, firstPageName: string, next: any) => {
  const firstPath = pagePath[firstPageName] || ToSignOut(next);
  next(firstPath);
};

const home = "/dashboard";
// 頁面權限驗證
export default (routes: Array<RouteRecordRaw>, toPath: string, pageName: string, next: any) => {
  // 路徑小寫
  const path = toPath.toLowerCase();
  // 必須驗證
  const hasCheckRule: boolean = path.indexOf(home) >= 0;
  const rulePages = Object.freeze(localStorage.getHash("roleInfo")?.rule?.pages || []);
  // 必須驗證
  if (hasCheckRule) {
    // 沒有權限資料
    if (rulePages.length === 0) {
      return ToSignOut(next);
    }
    // 驗證頁面權限
    if (path !== home && !rulePages.includes(pageName)) {
      next("/autherror");
    }
    // 前往第一頁
    if (path === home || path === `${home}/`) {
      ToFirstPage(routes, rulePages[0], next);
      return;
    }
  }
  next();
};
