<template>
<div class="bodyMargin">
  <div class="headerH2">
    <vs-avatar badge badge-color="success" size="70" style="margin: 0 auto;">
      <img src="../../public/img/avatar.jpg" alt="">
      <template #badge>
        {{watchListLengthCalc}}
      </template>
    </vs-avatar>
  <h2 style="display: inline-block;">watch list</h2>
  </div>
  <hr>
  <keep-alive>
  <bookmarkPost @endLoad="endOrLoad = 'End of Content'"/>
  </keep-alive>
  <p style="margin-bottom: 5rem; opacity: 0.5; font-size:15px;">{{endOrLoad}}</p>
</div>
</template>

<script>
import  {mapState,mapGetters} from 'vuex'
export default {
  name: "Bookmark",
  components: {
    bookmarkPost: () => import(/* webpackPrefetch: true */ '../components/Bookmark/bookmarkPost')
  },
  data(){
    return{
    }
  },
  created() {
    this.$store.commit('toggleNavbar',true);
  },
  computed:{
    ...mapState(['endOrLoad','watchListLength']),
    ...mapGetters(['watchListLengthCalc'])
  }
}
</script>

<style scoped>
.headerH2{
margin-top: 1.5rem;
}
hr {
  border: 0;
  height: 1px;
}
</style>