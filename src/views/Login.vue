<template>
  <h1>Login</h1>
  <div><input type="text" placeholder="Email" v-model="email" /></div>
  <div><input type="password" placeholder="Password" v-model="password" /></div>
  <div>
    <button @click="forgotPassword">Forgot Password</button>
    <button @click="login">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const router = useRouter();
const login = () => {
  // we'll let firebase determine the password rules
  // for just make sure password and confirm are the same

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!", data);
      router.push("/home");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const forgotPassword = () => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      // Password reset email sent!
      // ..
      alert("Password reset email sent!");
    })
    .catch((error) => {
      console.log("Password reset error", error);
      alert(error.message);
      // ..
    });
};
</script>
