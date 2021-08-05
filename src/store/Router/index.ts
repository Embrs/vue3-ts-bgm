import type { ActionContext } from "vuex";
export type ObjectString = {
  [key: string]: string;
};

type MenuItem = {
  name: string;
  path: string;
  menus: Array<MenuItem>;
};
export interface State {
  pagePath: ObjectString;
  menuList: Array<MenuItem>;
}
export default {
  namespaced: true,
  state: {
    pagePath: {},
    menuList: []
  },
  actions: {
    HandSetPagePath(context: ActionContext<any, any>, keyValue: ObjectString) {
      context.commit("setPagePath", keyValue);
    },
    CreateMenuList(context: ActionContext<any, any>) {
      context.commit("setMenuList");
    }
  },
  mutations: {
    setPagePath(state: State, keyValue: ObjectString) {
      state.pagePath[keyValue.page] = keyValue.path;
    },
    setMenuList(state: State) {
      state.menuList.length = 0;
      const rulePages = Object.freeze(localStorage.getHash("roleInfo")?.rule?.pages || []);
      // 切割路徑組別
      const CutPathToGroup = (path: string) => {
        const _path = path.replace("/dashboard/", "");
        return _path.split("/:")[0].split("/");
      };
      // 插入 menu 節點
      const InsertMenuPoint = (menus: Array<MenuItem>, page: string, path: string, points: Array<string>) => {
        // 已無節點
        if (points.length === 0) return;
        const point = points[0];

        // 當節點是目前頁面
        if (point === page.toLowerCase()) return menus.push({ name: point, path, menus: [] });

        // 當節點非目前頁面
        let _index = menus.findIndex((menu) => menu.name === point);
        if (_index == -1) {
          // 找無已加入的節點
          menus.push({ name: point, path: "", menus: [] });
          _index = menus.length - 1;
        }

        // 節點縮減
        points.splice(0, 1);
        // 遞迴
        InsertMenuPoint(menus[_index].menus, page, path, points);
      };
      for (const page of rulePages) {
        const path = (state.pagePath[page] || "").toLowerCase();
        if (path !== "") {
          const points = CutPathToGroup(path); // 節點
          InsertMenuPoint(state.menuList, page, path, points); // menu， 頁面，路徑，節點
        }
      }
    }
  },
  getters: {
    pagePath: (state: State) => state.pagePath,
    menuList: (state: State) => state.menuList
  }
};
