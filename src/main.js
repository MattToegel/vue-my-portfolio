import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import router from "./router";
import store from './store'
import { getAuth, onAuthStateChanged } from "@firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyClJu7Kob8TM-jiTm9AtEaV0If462IVN5k",
  authDomain: "vue-my-portfolio.firebaseapp.com",
  projectId: "vue-my-portfolio",
  storageBucket: "vue-my-portfolio.appspot.com",
  messagingSenderId: "303380551017",
  appId: "1:303380551017:web:7e9e03bf7fe57ef61e59f8",
};

initializeApp(firebaseConfig);

let app;
const auth = getAuth();
//ensures app is created during auth changes (and page refreshes)
onAuthStateChanged(auth, () => {
if (!app) {
  app = createApp(App);
  app.use(store);
  app.use(router);
  app.mount("#app");
}
});
