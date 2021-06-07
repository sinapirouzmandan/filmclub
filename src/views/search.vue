<template>
<div class="bodyMargin">
  <searchFixedHeader/>
  <searchUsers/>
</div>
</template>

<script>
import searchUsers from "../components/search/searchUsers";
import searchFixedHeader from "../components/search/searchFixedHeader";
export default {
  name: "search.vue",
  components: {searchFixedHeader, searchUsers},
  created() {
    this.$store.commit('toggleNavbar',true);
  }
}
</script>

<style scoped>
</style>