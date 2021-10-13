import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: null },
    { path: "/dashboard/:id", component: null },
    { path: "/registreren", component: null },
    { path: "/prikkr/:id", component: null },
    { path: "/:notFound(.*)", component: null },
  ],
});

export default router;