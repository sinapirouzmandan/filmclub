<template>
  <div class="bodyMargin">
    <searchFixedHeader @focused="searchBoxActivator" @unfocused="searchBoxDeActivator"/>
    <keep-alive>
      <component :is="searchBox" :isLoading="isSearching"></component>
    </keep-alive>
    <p style="margin-bottom: 5rem; opacity: 0; font-size:15px;">{{ endOrLoad }}</p>

  </div>
</template>

<script>
import searchFixedHeader from "../components/search/searchFixedHeader";
import boxOffice from "../components/search/boxOffice";
import searchUsers from "../components/search/searchUsers";
import {mapState} from "vuex";
import PullToRefresh from "pulltorefreshjs";

export default {
  name: "search.vue",
  data() {
    return {
      searchBox: boxOffice,
      isSearching: false
    }
  },
  components: {
    searchFixedHeader
  },
  methods: {
    searchBoxActivator(val) {
      this.searchBox = searchUsers
      this.isSearching = val
    },
    searchBoxDeActivator() {
      this.searchBox = boxOffice
    }
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.commit('toggleNavbar', true);
  },
  computed: {
    ...mapState(['endOrLoad']),
  },
  mounted() {
    PullToRefresh.init({
      mainElement: 'body'
    });
  }
}
</script>

<style scoped>
</style>