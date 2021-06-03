<template>
<div class="bodyMargin">
  <searchFixedHeader/>
  <searchUsers/>
</div>
</template>

<script>
import searchUsers from "../components/searchUsers";
import searchFixedHeader from "../components/searchFixedHeader";
export default {
  name: "search.vue",
  components: {searchFixedHeader, searchUsers}
}
</script>

<style scoped>

</style>