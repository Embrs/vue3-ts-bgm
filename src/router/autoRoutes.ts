import type { RouteRecordRaw } from "vue-router";
import store from "@/store";
interface Childs {
  [key: string]: RouteInfo;
}
interface RouteInfo {
  childs: Childs;
  pathPoint: Array<string>;
  page: string;
  componentPath: string;
  // component?(): Promise<void>;
}

const viewsFile = require.context("@/views", true, /^(?!.*test).*\.vue$/is);
const routesObj: RouteInfo = { childs: {}, pathPoint: [], page: "", componentPath: "" };

// 建立深度結構
for (const filePath of viewsFile.keys()) {
  const pathPoint = filePath.replace("./", "").replace(".vue", "").split("/");
  let _obj = routesObj;
  for (const pathKey of pathPoint) {
    // const name = pathPoint.join("");
    let page = pathPoint[pathPoint.length - 1].toLowerCase();
    if (page.indexOf("_") >= 0) {
      page = pathPoint[pathPoint.length - 2].toLowerCase();
    }
    const lastPath = pathPoint[pathPoint.length - 1];
    if (!_obj.childs[pathKey] && page !== "NotFound") {
      if (lastPath !== pathKey) {
        // 此節點為過程節點
        _obj.childs[pathKey] = {
          childs: {},
          pathPoint: [],
          page: "",
          componentPath: ""
        };
      } else {
        _obj.childs[pathKey] = {
          childs: {},
          pathPoint,
          page,
          componentPath: `/${pathPoint.join("/")}`
        };
      }
    }
    _obj = _obj.childs[pathKey];
  }
}

// 建立 routes
const CreateRoutes = (_childs: Childs) => {
  const currentRoute: Array<RouteRecordRaw> = [];
  for (const key in _childs) {
    let childRoute: Array<RouteRecordRaw> = [];
    const { pathPoint, componentPath, page, childs }: RouteInfo = _childs[key];
    // 如果有child
    if (Object.keys(childs).length > 0) {
      childRoute = CreateRoutes(childs);
    }
    // 處理變數 ex _id 轉 :id?
    for (let i = 0; i < pathPoint.length; i++) {
      if (pathPoint[i].indexOf("_") === 0) {
        pathPoint[i] = `:${pathPoint[i].replace("_", "")}?`;
      }
    }
    // 加入 routers
    if (_childs[key].page === "") {
      currentRoute.push(...childRoute);
    } else {
      currentRoute.push({
        path: `/${pathPoint.join("/")}`.toLowerCase(),
        name: page,
        component: () => import(`@/views${componentPath}.vue`),
        children: childRoute
      });
      store.dispatch("Router/HandSetPagePath", { page, path: `/${pathPoint.join("/")}`.toLowerCase() });
    }
  }
  return currentRoute;
};
const routes: Array<RouteRecordRaw> = CreateRoutes(routesObj.childs);

routes.push(
  {
    path: "/",
    name: "First",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue")
  }
);
export default routes;
