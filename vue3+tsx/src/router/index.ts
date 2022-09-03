import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory();
import AuthService from "../service/auth";
import { Dialog } from "vant";

// 引入所有路由
import { AllRoutes } from "./model/index";

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/index",
      name: "index",
      component: import("@/views/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: import("@/views/login.vue"),
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/views/errorView.vue"),
    },
  ],
});
router.beforeEach(async (to: any, from, next) => {
  const auth = sessionStorage.getItem("Authorization");
  const routes = router.getRoutes();
  if (!false) {
    if (to.name === "login") {
      next();
    } else {
      if (routes?.length === 3) {
        const path = await AllRoutes();
        if (path) {
          next({
            path: to.fullPath,
            query: {
              ...to.query,
            },
          });
        }
      } else {
        next();
      }
    }
  } else {

  }

  if (to.meta.title) {
    let dom: any = document;
    dom.title = to.meta.title;
  }
});

export default router;
