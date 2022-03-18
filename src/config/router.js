import { createRouter, createWebHistory } from "vue-router";
import { Home, Detail } from "../pages";
import { MainLayout } from "../components";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        alias: ["home", "homepage", "index"],
      },
      {
        path: "/detail/:id",
        name: "detail",
        props: true,
        component: Detail,
        alias: ["/profile/:id", "/:id"],
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
