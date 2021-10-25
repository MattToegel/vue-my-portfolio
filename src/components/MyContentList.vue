<!-- list of list items-->
<template>
  <my-content-list-item
    v-for="post of posts"
    :key="post.id"
    :id="post.id"
    :title="post.title"
    :summary="post.summary"
    :updated="post.updated"
  ></my-content-list-item>
</template>
<script>
import MyContentListItem from "./MyContentListItem.vue";
export default {
  components: { MyContentListItem },
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
};
</script>