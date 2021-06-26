<template>
  <div>
    <newpost/>
  </div>
</template>

<script>
import newpost from "../components/NewPost/postDetail.vue";

export default {
  name: "NewPost",
  components: {newpost},
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.dispatch('getUserProfile')
  }
}
</script>