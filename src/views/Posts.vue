<template>
  <h1>Posts Sample</h1>
  <my-content-list :posts="posts"></my-content-list>
</template>
<script>
import MyContentList from "../components/MyContentList.vue";
import {
  query,
  collection,
  orderBy,
  limit,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { ref } from "@vue/reactivity";
export default {
  components: { MyContentList },
  setup() {
    const db = getFirestore();
    const posts = ref([]);
    const q = query(
      collection(db, "posts"),
      orderBy("updated", "desc"),
      limit(10)
    );
    getDocs(q).then((snap) => {
      let p = [];
      if (snap.size > 0) {
        snap.forEach((doc) => {
          p.push(doc.data());
        });
      }
      posts.value = p;
      console.log("posts", p);
    });
    return { posts };
  },
};
</script>