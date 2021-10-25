import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => {
      // @ts-ignore
      return import(/* webpackChunkName: "home" */ "../views/Home.vue");
    },
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => {
      // @ts-ignore
      return import(/* webpackChunkName: "posts" */ "../views/Posts.vue");
    },
  },
  {
    path: "/post/:id?",
    // @ts-ignore
    component: () =>
      // @ts-ignore
      import(/* webpackChunkName: "MyContent" */ "../views/MyContent.vue"),
    props:true
  },
  {
    path: "/register",
    // @ts-ignore
    component: () =>
      // @ts-ignore
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    // @ts-ignore
    component: () =>
      // @ts-ignore
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
