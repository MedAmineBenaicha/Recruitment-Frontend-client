import { createStore } from "vuex";

import VuexPersistence from "vuex-persist";
import axios from "axios";

/**
 *  set axios headers :
 */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    access_token: state.access_token,
    client_logged_status: state.client_logged_status,
    actif_client: state.actif_client,
  }),
});

export default createStore({
  state: {
    /**
     *  Client
     */
    access_token: null,
    client_logged_status: false,
    actif_client: null,
    /**
     *  Candidates
     */
    candidates: [],
    candidate: null,
    /**
     *  Categories
     */
    categories: [],
    /**
     *  Contracts
     */
    contracts_type: [],
    /**
     *  Front end counter
     */
    counter: 1,
    notifications: [],
    /**
     *  Client Missions
     */
    client_missions: [],
    client_mission: null,
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    /**
     *  Client
     */
    SET_TOKEN_ACCESS(state, payload) {
      state.access_token = payload;
    },
    SET_CLIENT_STATUS(state, payload) {
      state.client_logged_status = payload;
    },
    SET_ACTIF_CLIENT(state, payload) {
      state.actif_client = payload;
    },
    REMOVE_CLIENT_DATE(state) {
      state.access_token = null;
      state.client_logged_status = false;
      state.actif_client = null;
    },
    SAVE_CANDIDATES(state, payload) {
      state.candidates = payload;
    },
    SAVE_CANIDATE(state, payload) {
      state.candidate = payload;
    },
    SAVE_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SAVE_CONTRACTS_TYPE(state, payload) {
      state.contracts_type = payload;
    },
    SET_UNREAD_NOTIFICATIONS(state, payload) {
      state.notifications = payload;
    },
    SET_CLIENT_MISSIONS(state, payload) {
      state.client_missions = payload;
    },
    SET_CLIENT_MISSION(state, payload) {
      state.client_mission = payload;
    },
  },
  actions: {
    /**
     *  Client
     */
    /**
     *  Sign In Action
     */
    loginPerform({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/client/login", payload)
          .then((res) => {
            commit("SET_TOKEN_ACCESS", res.data.access_token);
            localStorage.setItem("token", res.data.access_token);
            /**
             *  get the actif Client
             */
            dispatch("getActifCLient", res.data.access_token);
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    /**
     *  Sign Up Action
     */
    registrationPerform(context, payload) {
      return new Promise((resolve, reject) => {
        console.log("Before axiosInstance");
        axios
          .post("http://localhost:8000/api/auth/client/register", payload)
          .then((res) => {
            console.log("After Done axiosInstance");
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    /**
     *  Reset Password Request
     */
    resetPasswordRequest(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/reset-password-request", payload)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    /**
     *  Reset Password with Email
     */
    resetPassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/reset-password", payload)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    /**
     *  Check client status
     */
    getActifCLient({ commit, getters }) {
      axios.defaults.headers.common["Accept"] = "application/json";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + getters.getToken;
      axios
        .post("http://localhost:8000/api/auth/client/me")
        .then((response) => {
          commit("SET_CLIENT_STATUS", true);
          commit("SET_ACTIF_CLIENT", response.data);
        })
        .catch((error) => {
          console.log("status : " + error.response);
          commit("SET_CLIENT_STATUS", false);
        });
    },
    /**
     *   Get Client Profile
     */
    getCLientProfile({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post("http://localhost:8000/api/auth/client/me")
          .then((response) => {
            commit("SET_ACTIF_CLIENT", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log("status : " + error.response);
            reject(error);
          });
      });
    },
    /**
     *  logout client
     */
    logoutPerform({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;

        axios
          .post("http://localhost:8000/api/auth/client/logout")
          .then((res) => {
            console.log("After Done Logout axiosInstance");
            commit("SET_ACTIF_CLIENT", null);
            commit("SET_TOKEN_ACCESS", null);
            commit("SET_CLIENT_STATUS", false);
            localStorage.removeItem("token");
            resolve(res);
          })
          .catch((error) => {
            console.log(error.response.data);
            reject(error);
          });
      });
    },
    /**
     *  Browse Candidates Profile :
     */
    loadCandidates({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .get("http://localhost:8000/api/candidates")
          .then((result) => {
            console.log("load candiates 2");
            commit("SAVE_CANDIDATES", result.data);
            resolve(result);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },
    loadCategories({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .get("http://localhost:8000/api/categories")
          .then((result) => {
            console.log("load categories");
            commit("SAVE_CATEGORIES", result.data);
            resolve(result);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },
    /**
     *  Load Contracts types From Api
     */
    loadContractsType({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .get("http://localhost:8000/api/contractstype")
          .then((result) => {
            resolve(result);
            commit("SAVE_CONTRACTS_TYPE", result.data);
          })
          .catch((error) => {
            reject(error);
            console.log(error.message);
          });
      });
    },
    updateClient({ dispatch, getters }, payload) {
      console.log("actioooons");
      return new Promise((resolve, reject) => {
        const apiUpdateRoute =
          "http://localhost:8000/api/clients/" + payload.id;
        console.log(apiUpdateRoute);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        console.log(payload.client);

        axios
          .post(apiUpdateRoute, payload.client)
          .then((res) => {
            dispatch("getActifCLient");
            console.log("update done");
            resolve(res);
          })
          .catch((error) => {
            console.log(error.response.data);
            reject(error);
          });
      });
    },
    // get candidate profile
    getCandidate({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .get("http://localhost:8000/api/candidates/" + payload)
          .then((result) => {
            commit("SAVE_CANIDATE", result.data);
            resolve(result);
          })
          .catch((error) => {
            console.log(error.response.data);
            reject(error);
          });
      });
    },

    // Create new Mission
    setMission({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const config = { headers: { "content-type": "multipart/form-data" } };
        axios
          .post("http://localhost:8000/api/missions", payload, config)
          .then((response) => {
            console.log("Im here");
            resolve(response);
          })
          .catch((error) => {
            console.log("mission error : " + error.response);
            reject(error);
          });
      });
    },

    // Create new Contract
    setContract({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post("http://localhost:8000/api/contracts", payload)
          .then((response) => {
            console.log("Im here");
            resolve(response);
          })
          .catch((error) => {
            console.log("contract error : " + error.response);
            reject(error);
          });
      });
    },

    // update client image
    updateClientImage({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const config = { headers: { "content-type": "multipart/form-data" } };
        const apiUpdateRoute =
          "http://localhost:8000/api/clients/" + payload.id;
        axios
          .post(apiUpdateRoute, payload.client, config)
          .then((response) => {
            console.log("Im here in then bloc => succes");
            resolve(response);
          })
          .catch((error) => {
            console.log("mission error : " + error.response);
            reject(error);
          });
      });
    },

    // Get Unread Notification
    getUnreadNotifications({ commit, getters }, payload) {
      console.log("notif2...");
      axios.defaults.headers.common["Accept"] = "application/json";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + getters.getToken;
      axios
        .get("http://localhost:8000/api/client/notifications/" + payload)
        .then((response) => {
          commit("SET_UNREAD_NOTIFICATIONS", response.data);
        })
        .catch((error) => {
          console.log("status : " + error.response);
        });
    },

    // Mark notifications as read
    markNotificationsAsRead({ commit, getters }, payload) {
      axios.defaults.headers.common["Accept"] = "application/json";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + getters.getToken;
      axios
        .get(
          "http://localhost:8000/api/clients/" +
            payload +
            "/notifications/markasread"
        )
        .then(() => {
          commit("SET_UNREAD_NOTIFICATIONS", []);
        })
        .catch((error) => {
          console.log("status : " + error.response);
        });
    },

    // Get Client Missions
    getCLientMissions({ commit, getters }, payload) {
      axios.defaults.headers.common["Accept"] = "application/json";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + getters.getToken;
      axios
        .get(
          "http://localhost:8000/api/clients/" + payload.client_id + "/missions"
        )
        .then((response) => {
          commit("SET_CLIENT_MISSIONS", response.data);
        })
        .catch((error) => {
          console.log("status : " + error.response);
        });
    },

    // Get Specific Mission to specific client
    getMissionById({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const apiRoute =
          "http://localhost:8000/api/clients/" +
          payload.client_id +
          "/missions/" +
          payload.mission_id;
          console.log(apiRoute)
        axios
          .get(apiRoute)
          .then((response) => {
            commit("SET_CLIENT_MISSION", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log("status : " + error.response);
            reject(error);
          });
      });
    },

    // Rate Mission
    rateMission({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post("http://localhost:8000/api/rating", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log("Rating error : " + error.response);
            reject(error);
          });
      });
    },

    // Update Mission Rating Status
    updateMissionRatingStatus({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const apiUpdateRoute =
          "http://localhost:8000/api/missions/" + payload.id;
        axios
          .post(apiUpdateRoute, payload.mission)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
  getters: {
    /**
     *  Client
     */
    getToken(state) {
      return state.access_token;
    },
    getClientStatus(state) {
      return state.client_logged_status;
    },
    getActifClient(state) {
      return state.actif_client;
    },
    getCandidates(state) {
      return state.candidates;
    },
    getCandidate(state) {
      return state.candidate;
    },
    getCategories(state) {
      return state.categories;
    },
    getContractsType(state) {
      return state.contracts_type;
    },
    getCounter(state) {
      return state.counter;
    },
    getUnreadNotifications(state) {
      return state.notifications;
    },
    getClientMissions(state) {
      return state.client_missions;
    },
    getClientMission(state) {
      return state.client_mission;
    },
  },

  modules: {},
});
