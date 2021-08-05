import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./autoRoutes";
import AutPathhCheck from "./authPathCheck";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 頁面載入觸發
router.beforeEach(async (to, from, next) => {
  AutPathhCheck(routes, to.path, to.name as string, next);
});

// 頁面載入進度條完成
// router.afterEach(() => {
//   return true;
// });

export default router;
