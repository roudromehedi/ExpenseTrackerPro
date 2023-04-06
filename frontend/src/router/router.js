import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/home-page.vue";
import LoginPage from "../components/login-page.vue";
import Dashboard from "../components/dashboard-page.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
