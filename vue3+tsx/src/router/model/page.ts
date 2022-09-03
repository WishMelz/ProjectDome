import { ERoutName } from "../type";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: `/order`,
    name: "订单",
    meta: {
      title: "订单",
      isBack: true,
    },
    component: () =>
      import(/* webpackChunkName: "order" */ "@/views/order/index.vue"),
  },
];

export default routes;
