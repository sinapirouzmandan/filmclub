<template>
<div>
  <movieName/>
</div>
</template>

<script>
import movieName from "../components/NewPost/movieName";
export default {
  name: "NewPost",
  components:{movieName},
  created() {
    this.$store.dispatch('getUserProfile')
  }
}
</script>

<style scoped>

</style>