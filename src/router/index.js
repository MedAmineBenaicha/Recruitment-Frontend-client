import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import BrowseProfiles from "../views/BrowseProfiles";
import CandidateProfile from "../views/CandidateProfile";
import ClientProfile from "../views/ClientProfile";
import Error from "../views/Error";

//import store from '../store/index'

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      guest: true,
    },
  },
  {
    path: "/browse",
    name: "BrowseProfiles",
    component: BrowseProfiles,
    meta: {
      guest: true,
    },
    children: [],
  },
  {
    path: "/browse/candidate/:id",
    name: "candidateProfile",
    component: CandidateProfile,
    meta: {
      guest: true,
    },
  },
  {
    path: "/profile",
    name: "ClientProfile",
    component: ClientProfile,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
    meta: {
      guest: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 *  Function to check Authentification before Routing
 */

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/error",
        params: { nextUrl: to.fullPath },
      });
    }else{
      next();
    }
  } else {
    next();
  }
});

export default router;
