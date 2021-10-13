import { createRouter, createWebHistory } from "vue-router";

import MyDashboard from "./pages/dashboard/MyDashboard.vue";
import HomePage from "./pages/home/HomePage.vue";
import RegisterUser from "./pages/register/RegisterUser.vue";
import PrikkrPage from "./pages/prikkr/PrikkrPage.vue";
import CreatePrikkr from "./pages/createprikkr/CreatePrikkr.vue";
import NotFound from "./pages/NotFound.vue";
import PrikkrDetails from "./pages/dashboard/PrikkrDetails.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage, meta: { requiresUnauth: true } },
    {
      path: "/dashboard",
      component: MyDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/:id",
      component: PrikkrDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/registreren",
      component: RegisterUser,
      meta: { requiresUnauth: true },
    },
    {
      path: "/nieuw",
      component: CreatePrikkr,
      meta: { requiresAuth: true },
    },
    { path: "/prikkr/:id", component: PrikkrPage },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// auth check & unauth check
router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/registreren");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
