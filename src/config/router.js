import { createRouter, createWebHistory } from "vue-router";
const MainLayout = () => import("../components/layouts/MainLayout.vue");
const ErrorLayout = () => import("../components/layouts/ErrorLayout.vue");
const Home = () => import("../pages/Home.vue");
const Detail = () => import("../pages/Detail.vue");
const NotFound = () => import("../pages/NotFound.vue");

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
        path: "detail/:id",
        name: "detail",
        props: true,
        component: Detail,
        alias: ["/profile/:id"],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorLayout,
    children: [
      {
        path: "",
        name: "notfound",
        component: NotFound,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
