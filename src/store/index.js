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

    /**
     *  Client Contracts
     */
    client_contracts: [],
    client_contract: null,
    /**
     *  Chat Data
     */
    chatRooms: [],
    currentRoom: null,
    messages: [],
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
    SET_CLIENT_CONTRACTS(state, payload) {
      state.client_contracts = payload;
    },
    SET_CLIENT_CONTRACT(state, payload) {
      state.client_contract = payload;
    },
    SET_CHAT_DATA(state,payload){
      state.chatRooms = payload;
      state.currentRoom = payload[0];
    },
    SET_CHAT_MESSAGES(state,payload){
      state.messages = payload;
    }
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

    // Get Client Contracts
    getCLientContracts({ commit, getters }, payload) {
      axios.defaults.headers.common["Accept"] = "application/json";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + getters.getToken;
      axios
        .get(
          "http://localhost:8000/api/clients/" +
            payload.client_id +
            "/contracts"
        )
        .then((response) => {
          console.log("data is :");
          console.log(response.data);
          commit("SET_CLIENT_CONTRACTS", response.data);
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
        console.log(apiRoute);
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

    // Pay Mission
    payMission({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post("http://localhost:8000/api/payment-mission", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log("Payment error : " + error.response);
            reject(error);
          });
      });
    },

    // Get Specific Contract to specific client
    getContractById({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const apiRoute =
          "http://localhost:8000/api/clients/" +
          payload.client_id +
          "/contracts/" +
          payload.contract_id;
        console.log(apiRoute);
        axios
          .get(apiRoute)
          .then((response) => {
            commit("SET_CLIENT_CONTRACT", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log("status : " + error.response);
            reject(error);
          });
      });
    },

    // Pay Contract
    payContract({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post("http://localhost:8000/api/payment-contract", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log("Payment error : " + error.response);
            reject(error);
          });
      });
    },

    // Rate Contract
    rateContract({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post("http://localhost:8000/api/contract-rating", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log("Rating error : " + error.response);
            reject(error);
          });
      });
    },

    // Update Contract Payment Status
    updateContractPaymentStatus({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const apiUpdateRoute =
          "http://localhost:8000/api/contracts/" + payload.id;
        axios
          .post(apiUpdateRoute, payload.contract)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    // Update Contract Rating Status
    updateContractRatingStatus({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const apiUpdateRoute =
          "http://localhost:8000/api/contracts/" + payload.id;
        axios
          .post(apiUpdateRoute, payload.contract)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    // // Update Mission Status == > in progress after payment Done
    updateMissionStatus({ getters }, payload) {
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

    // // Update Mission Status == > in progress after payment Done
    updateContractStatus({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        const apiUpdateRoute =
          "http://localhost:8000/api/contracts/" + payload.id;
        axios
          .post(apiUpdateRoute, payload.contract)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
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

    // Update Mission Payment Status
    updateMissionPaymentStatus({ getters }, payload) {
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

    // Print Mission Invoice
    printPaymentMissionInvoice({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
          console.log('printing')
        const apiUpdateRoute =
          "http://localhost:8000/api/client/print-mission-invoice";
        axios
          .post(apiUpdateRoute, payload)
          .then((res) => {
            console.log('printing 2')
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // Print Contract Invoice
    printPaymentContractInvoice({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
          console.log('printing')
        const apiUpdateRoute =
          "http://localhost:8000/api/client/print-contract-invoice";
        axios
          .post(apiUpdateRoute, payload)
          .then((res) => {
            console.log('printing 2')
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     *  Function for Chat
     */
    // get Rooms of Chat
    getRooms({ commit,getters }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .get("http://localhost:8000/api/chat/rooms")
          .then((result) => {
            commit("SET_CHAT_DATA", result.data);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //getMessages of current Room
    getMessages({commit,getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .get(
            "http://localhost:8000/api/chat/rooms/" +
              payload.room_id +
              "/messages"
          )
          .then((result) => {
            commit("SET_CHAT_MESSAGES", result.data);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // Send Message
    sendMessage({ getters }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + getters.getToken;
        axios
          .post(
            "http://localhost:8000/api/client/chat/rooms/" +
              payload.room_id +
              "/message",
            payload.message
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log("Message error : " + error.response);
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
    getClientContracts(state) {
      console.log("data from getter is :");
      console.log(state.client_contracts);
      return state.client_contracts;
    },
    getClientContract(state) {
      console.log("data from getter is :");
      console.log(state.client_contract);
      return state.client_contract;
    },
    getCurrentRoom(state){
      return state.currentRoom;
    },
    getMessages(state){
      return state.messages;
    }
  },

  modules: {},
});
