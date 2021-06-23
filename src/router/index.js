import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import BrowseProfiles from "../views/BrowseProfiles";
import CandidateProfile from "../views/CandidateProfile";
import CandidateContract from "../views/CandidateContract";
import ClientProfile from "../views/ClientProfile";
import ClientMissions from "../views/ClientMissions";
import RateMission from "../views/RateMission";
import ClientContracts from "../views/ClientContracts";
import Error from "../views/Error";

//import store from '../store/index'

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
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
    path: "/browse/candidate/contract/:id",
    name: "candidateContract",
    component: CandidateContract,
    meta: {
      guest: true,
    },
  },
  {
    path: "/profile",
    name: "ClientProfile",
    component: ClientProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clients/:id/missions",
    name: "ClientMissions",
    component: ClientMissions,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clients/:id/missions/:mission_id/rate",
    name: "RateMission",
    component: RateMission,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clients/:id/contracts",
    name: "ClientContracts",
    component: ClientContracts,
    meta: {
      requiresAuth: true,
    },
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
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
