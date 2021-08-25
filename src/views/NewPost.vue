<template>
  <div>
    <newpost/>
  </div>
</template>

<script>
import newpost from "../components/NewPost/postDetail.vue";

export default {
  name: "NewPost",
  metaInfo: {
    title: 'New Post',
    titleTemplate: '%s | FilmClub'
  },
  components: {newpost},
  created() {
    this.$store.commit('changeErrMsg', null)
  }
}
</script>