<template>
  <h1>Login</h1>
  <div><input type="text" placeholder="Email" v-model="email" /></div>
  <div><input type="password" placeholder="Password" v-model="password" /></div>
  <div>
    <button @click="forgotPassword">Forgot Password</button>
    <button @click="login">Submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "vue-router"; // import router

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const auth = getAuth();
    return {
      email,
      password,
      router,
      auth,
    };
  },

  methods: {
    forgotPassword() {
      sendPasswordResetEmail(this.auth, this.email)
        .then(() => {
          // Password reset email sent!
          // ..
          //alert("Password reset email sent!");
          this.$flashMessage.show({
            type: "success",
            title: "Password Reset Email Sent!",
            text: "Please check your email and potentially your spam folder",
          });
        })
        .catch((error) => {
          console.log("Password reset error", error);
          this.$flashMessage.show({
            type: "error",
            title: "Password Reset Error",
            text: error.message,
          });
          // ..
        });
    },
    login() {
      // we'll let firebase determine the password rules
      // for just make sure password and confirm are the same
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((data) => {
          console.log("Successfully logged in!", data);
          this.$flashMessage.show({
            type: "success",
            title: "Login Successful",
            text: "Welcome!",
          });
          this.router.push("/home");
        })
        .catch((error) => {
          console.log(error.code);
          //alert(error.message);
          this.$flashMessage.show({
            type: "error",
            title: "Login Error",
            text: error.message,
          });
        });
    },
  },
};
</script>
