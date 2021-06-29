<template>
  <div class="home bodyMargin">
    <fixedHead/>
    <vs-row>
      <vs-col lg="4">
        <Notifications v-if="!isMobile" :position="position"/>
      </vs-col>
      <vs-col lg="8" sm="12" xs="12">
        <vs-row>
          <posts/>
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
  components: {posts: singlePost, fixedHead, Notifications},
  data() {
    return {
      images: [],
      isMobile: true,
      position: {
        position: 'fixed',
        top: '3rem',
        maxWidth: '550px'
      }
    }
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    if (window.innerWidth >= 1000) {
      this.isMobile = false
    }
    this.$store.commit('toggleNavbar', true);
  }
}
</script>
<style scoped>
.home {
  margin-top: 1.5rem;
}

</style>
<style scoped>

</style>
