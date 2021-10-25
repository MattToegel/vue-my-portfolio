<template>
  <div class="home">
    <p v-if="username">Welcome, {{ username }}</p>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const currentUser = computed(() => {
      return store.getters.currentUser;
    });
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
    return { username };
  },
};
</script>
