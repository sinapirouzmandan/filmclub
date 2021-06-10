<template>
<div class="bodyMargin">
  <searchFixedHeader/>
  <searchUsers/>
</div>
</template>

<script>
export default {
  name: "search.vue",
  components: {
    searchFixedHeader: () => import(/* webpackPrefetch: true */ '../components/search/searchFixedHeader')
    , searchUsers: () => import(/* webpackPrefetch: true */ '../components/search/searchUsers')
  },
  created() {
    this.$store.commit('toggleNavbar',true);
  }
}
</script>

<style scoped>
</style>