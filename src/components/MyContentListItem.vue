<!-- list item in a list of content -->
<template>
  <div class="row">
    <div>{{ title }}</div>
    <div>{{ summary }}</div>
    <div>{{ postDate }}</div>
    <div><router-link :to="`/post/${id}`">View</router-link></div>
  </div>
</template>
<script>
import { computed } from "vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    updated: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    const postDate = computed(() => {
      return (
        props.updated.toDate().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
        " " +
        props.updated.toDate().toLocaleTimeString("en-us")
      );
    });
    return {
      postDate,
    };
  },
};
</script>
<style scoped>
.row {
  border: 1px solid black;
}
</style>