<template>
  <nav-bar></nav-bar>
  <ChatPop v-if="loggedClient" />

  <router-view />
</template>

<script>
import NavBar from "./components/layout/NavBar";
import ChatPop from "./components/layout/ChatPop";
//import Echo from 'laravel-echo'
export default {
  components: {
    NavBar,
    ChatPop,
  },
  data() {
    return {};
  },
  computed: {
    client() {
      return this.$store.getters.getActifClient;
    },
    loggedClient() {
      return this.$store.getters.getClientStatus;
    },
  },
  methods: {
    getActifCLient() {
      this.$store.dispatch("getActifCLient");
    },
    getToken() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$store.commit("SET_TOKEN_ACCESS", token);
      }
    },
    connect() {
      console.log("testt");
      this.getMessages();
      console.log('echooo')
      console.log(window.Echo)
      window.Echo.channel("chat1").listen("NewChatMessage", (e) => {
        console.log("lisssste");
        console.log(e);
        this.getMessages();
      });
    },
  },
  created() {
  },
};
</script>
