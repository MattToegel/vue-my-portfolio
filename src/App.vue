<template>
  <div id="nav">
    <router-link to="/">Home</router-link> -
    <router-link v-if="!currentUser" to="/register">Register</router-link> -
    <router-link v-if="!currentUser" to="/login">Login</router-link> -
    <router-link v-if="currentUser" to="/login" @click="logout"
      >Logout</router-link
    >
  </div>
  <router-view />
  <FlashMessage />
</template>
<script setup>
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const currentUser = computed(() => {
  return store.getters.currentUser || {};
});
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  store.dispatch("fetchUser", user);
});
const logout = () => {
  auth.signOut();
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
