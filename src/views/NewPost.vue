<template>
<div>
  <movieName/>
</div>
</template>

<script>
import movieName from "../components/NewPost/movieName";
export default {
  name: "NewPost",
  created() {
    this.$store.commit('toggleNavbar',false);
  },
  components:{movieName}
}
</script>

<style scoped>

</style>