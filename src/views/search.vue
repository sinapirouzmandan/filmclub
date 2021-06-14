<template>
<div class="bodyMargin">
  <searchFixedHeader @focused="searchBoxActivator" @unfocused="searchBoxDeActivator"/>
  <keep-alive>
  <component :is="searchBox"></component>
  </keep-alive>
</div>
</template>

<script>
import searchFixedHeader from "../components/search/searchFixedHeader";
import boxOffice from "../components/search/boxOffice";
import searchUsers from "../components/search/searchUsers";
export default {
  name: "search.vue",
  data(){
    return{
      searchBox: boxOffice
    }
  },
  components: {
    searchFixedHeader
  },
  methods:{
    searchBoxActivator(){
      this.searchBox = searchUsers
    },
    searchBoxDeActivator(){
      this.searchBox = boxOffice
    }
  },
  created() {
    this.$store.commit('toggleNavbar',true);
  }
}
</script>

<style scoped>
</style>