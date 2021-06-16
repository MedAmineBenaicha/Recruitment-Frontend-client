<template>
  <nav-bar></nav-bar>
  <router-view />
</template>

<script>
import NavBar from "./components/layout/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  methods: {
    getActifCLient() {
      this.$store.dispatch('getActifCLient')
    },
    getToken(){
      const token = localStorage.getItem('token');
      if(token){
        this.$store.commit('SET_TOKEN_ACCESS',token);
      }
    }
  },
};
</script>
