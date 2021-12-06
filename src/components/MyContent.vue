<!-- View/Edit/Create -->
<template>
  <h1>{{ pageTitle }}</h1>
  <button v-if="canEdit" @click="isEditing = !isEditing">
    {{ isEditing ? "View" : "Edit" }}
  </button>
  <div v-if="isEditing">
    <form @submit.prevent="submit">
      <div>
        <input type="text" placeholder="Post Title" v-model="post.title" />
      </div>
      <div>
        <textarea placeholder="Post Summary" v-model="post.summary" />
      </div>
      <div>
        <textarea placeholder="Post Content" v-model="post.content" />
      </div>
      <button type="submit">{{ buttonText }}</button>
    </form>
  </div>
  <div v-else>
    <article>
      <header>{{ post.title }}</header>
      <section>
        {{ post.content }}
      </section>
    </article>
  </div>
</template>
<script>
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const currentUser = computed(() => {
      return store.getters.currentUser;
    });
    console.log("setup user", currentUser);
    const isEditing = ref(false);
    const db = getFirestore();
    const post = ref({
      title: "",
      id: props.id || "",
      content: "",
      summary: "",
      updated: false,
      author: "",
    });

    const slug = computed(() => {
      return post.value.title.trim().toLowerCase().replace(" ", "-");
    });
    const canEdit = computed(() => {
      if (!currentUser.value) {
        return false;
      }
      return post.value.author === currentUser.value.uid;
    });
    isEditing.value = canEdit && post.value.id.length === 0;
    const pageTitle = computed(() => {
      //conditionally display the title
      if (post.value.id.trim().length === 0) {
        return "Create Post";
      }
      if (canEdit && isEditing.value) {
        return "Edit Post";
      }
      return post.value.title;
    });
    const buttonText = computed(() => {
      return post.value.id.length > 0 ? "Save Post" : "Create Post";
    });
    console.log("post id", props.id);
    return {
      currentUser,
      canEdit,
      pageTitle,
      post,
      isEditing,
      buttonText,
      slug,
      db,
      router,
    };
  },
  mounted() {
    if (this.id) {
      getDoc(doc(this.db, "posts", this.id)).then((doc) => {
        if (doc.exists()) {
          this.post = Object.assign(this.post, doc.data());
        } else {
          this.$flashMessage.show({
            type: "warning",
            title: "Post Lookup",
            text: "The post you're looking for doesn't exist",
          });
        }
      });
    }
  },
  methods: {
    async submit() {
      let isValid = true;
      if (this.post.title.trim().length === 0) {
        isValid = false;
        this.$flashMessage.show({
          type: "warning",
          title: "Validation Error",
          text: "Title must be provided",
        });
      }
      if (this.post.summary.trim().length === 0) {
        isValid = false;
        this.$flashMessage.show({
          type: "warning",
          title: "Validation Error",
          text: "Summar must be provided",
        });
      }
      if (this.post.content.trim().length === 0) {
        isValid = false;
        this.$flashMessage.show({
          type: "warning",
          title: "Validation Error",
          text: "Content must be provided",
        });
      }
      console.log("isValid", isValid);
      if (isValid) {
        console.log(this.currentUser);
        //create
        const postData = Object.assign(this.post, {
          id: this.slug,
          author: this.currentUser.uid,
          updated: new Date(),
        });
        console.log("Post Data", postData);
        await setDoc(doc(this.db, "posts", this.slug), postData)
          .then(() => {
            if (this.post.id.trim().length === 0) {
              this.$flashMessage.show({
                type: "success",
                title: "Success",
                text: "Created new Post!",
              });
            } else {
              this.$flashMessage.show({
                type: "success",
                title: "Success",
                text: "Saved Post Changes!",
              });
            }
            this.router.replace(`/post/${this.slug}`);
          })
          .catch((err) => {
            this.$flashMessage.show({
              type: "error",
              title: "DB Error",
              text: err.message,
            });
          });
      }
    },
  },
};
</script>
