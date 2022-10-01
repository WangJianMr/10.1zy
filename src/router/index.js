import Vue from "vue";
import VueRouter from "vue-router";
import liayc from "../liayc";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "liayc",
    component: liayc,
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/home"),
      },
      {
        path: "/blog",
        name: "blog",
        component: () => import("../views/blog"),
        reairect: "/article",
        children: [
          {
            path: "label",
            name: "label",
            component: () => import("../views/blog/label"),
          },
          {
            path: "category",
            name: "category",
            component: () => import("../views/blog/category"),
          },
          {
            path: "article",
            name: "article",
            component: () => import("../views/blog/article"),
          },
        ],
      },
      {
        path: "/advert",
        name: "advert",
        component: () => import("../views/advert"),
      },
      {
        path: "/system",
        name: "system",
        component: () => import("../views/system"),
        reairect: "/user",
        children: [
          {
            path: "user",
            name: "user",
            component: () => import("../views/system/user"),
          },
          {
            path: "role",
            name: "role",
            component: () => import("../views/system/role"),
          },
          {
            path: "menu",
            name: "menu",
            component: () => import("../views/system/menu"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
