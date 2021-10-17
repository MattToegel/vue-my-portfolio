<template>
  <h1>Register</h1>
  <div><input type="text" placeholder="Email" v-model="email" /></div>
  <div><input type="password" placeholder="Password" v-model="password" /></div>
  <div>
    <input type="password" placeholder="Confirm Password" v-model="confirm" />
  </div>
  <div><button @click="register">Submit</button></div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const confirm = ref("");
const router = useRouter();
const register = () => {
  // we'll let firebase determine the password rules
  // for just make sure password and confirm are the same
  if (password.value !== confirm.value) {
    alert("Password and Confirm password must match");
    return;
  }

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!", data);
      router.push("/login");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
