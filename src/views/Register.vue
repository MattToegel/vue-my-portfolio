<template>
  <h1>Register</h1>
  <div><input type="text" placeholder="Email" v-model="email" /></div>
  <div><input type="password" placeholder="Password" v-model="password" /></div>
  <div>
    <input type="password" placeholder="Confirm Password" v-model="confirm" />
  </div>
  <div><button @click="register">Submit</button></div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router"; // import router

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirm = ref("");
    const router = useRouter();
    return { email, password, confirm, router };
  },
  methods: {
    register() {
      // we'll let firebase determine the password rules
      // for just make sure password and confirm are the same
      if (this.password !== this.confirm) {
        //alert("Password and Confirm password must match");
        this.$flashMessage.show({
          type: "warning",
          title: "Validation Error",
          text: "Passwords must match",
        });
        return;
      }

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log("Successfully registered!", data);
          this.$flashMessage.show({
            type: "success",
            title: "Registration Successful",
            text: "Successfully Registered!",
          });
          this.router.push("/login");
        })
        .catch((error) => {
          console.log(error.code);
          //alert(error.message);
          this.$flashMessage.show({
            type: "error",
            title: "Reigstration Error",
            text: error.message,
          });
        });
    },
  },
};
</script>
