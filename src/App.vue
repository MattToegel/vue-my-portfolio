<template>
  <div id="nav">
    <router-link to="/">Home</router-link> -
    <router-link v-if="!currentUser" to="/register">Register</router-link> -
    <router-link v-if="!currentUser" to="/login">Login</router-link> -
    <router-link v-if="currentUser" to="/login" @click="logout"
      >Logout</router-link
    >
  </div>
  <p v-if="username">Welcome, {{ username }}</p>
  <router-view />
</template>
<script setup>
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { computed } from "@vue/reactivity";

const auth = getAuth();
const currentUser = ref(auth.currentUser);
const username = computed(() => {
  console.log("current user change", currentUser.value);
  if (currentUser.value) {
    if (currentUser.value.displayName) {
      return currentUser.value.displayName;
    }
    return currentUser.value.email;
  }
  return "";
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user", user);
    currentUser.value = user;
  } else {
    console.log("user is logged out");
    currentUser.value = null;
  }
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
