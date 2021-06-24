<template>
  <div class="home bodyMargin">
    <fixedHead/>
    <vs-row>
      <vs-col lg="4">
      <Notifications v-if="!isMobile" :position="position"/>
    </vs-col>
      <vs-col sm="12" lg="8" xs="12">
        <vs-row>
          <single-post :number="post" v-for="(post,index)  in (1,20)" :key="index"></single-post>
        </vs-row>
      </vs-col>

    </vs-row>
    <p style="margin-bottom: 35px; opacity: 0.1; font-size:15px;">end of content ...</p>
  </div>
</template>

<script>
import fixedHead from "../components/Home/fixedHead";
import singlePost from '../components/Home/singlePost'
import Notifications from "./Notifications";
export default {
  name: 'Home',
  components: {singlePost,fixedHead,Notifications},
  data() {
    return{
      images:[],
      isMobile: true,
      position: {
        position:'fixed',
        top:'3rem',
        maxWidth: '550px'
      }
    }
  },
  created() {
    if (window.innerWidth >= 1000){
      this.isMobile = false
    }
    this.$store.commit('toggleNavbar',true);
    this.$store.dispatch('getUserProfile')
  }
}
</script>
<style scoped>
.home{
  margin-top: 1.5rem;
}

</style>
<style scoped>

</style>
