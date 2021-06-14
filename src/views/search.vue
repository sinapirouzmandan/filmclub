<template>
<div class="bodyMargin">
  <searchFixedHeader @focused="searchBoxActivator" @unfocused="searchBoxDeActivator"/>
  <keep-alive>
  <component :is="searchBox"></component>
  </keep-alive>
  <p style="margin-bottom: 5rem; opacity: 0.5; font-size:15px;">{{endOrLoad}}</p>

</div>
</template>

<script>
import searchFixedHeader from "../components/search/searchFixedHeader";
import boxOffice from "../components/search/boxOffice";
import searchUsers from "../components/search/searchUsers";
import {mapState} from "vuex";
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
  },
  computed:{
    ...mapState(['endOrLoad']),
  }
}
</script>

<style scoped>
</style>