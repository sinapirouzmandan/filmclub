<template>
  <div class="bodyMargin">
    <div class="overlayLoad" v-if="isLoading">
      <div class="loader">
      <loading/>
      </div>
    </div>
    <accountHeader/>
    <accountBio/>
    <accountStatus/>
    <tumb-post/>
    <vs-button
        circle
        class="notifIcon"
        color="#000"
        floating
        icon
        to="Notifications"
    >
      <i class='iconify' data-icon="bx:bx-bell"></i>
      {{ notificatonsCalc }}
    </vs-button>
  </div>
</template>
<script>
import PullToRefresh from 'pulltorefreshjs';
import accountStatus from "../components/profile/accountStatus";
import accountBio from "../components/profile/accountBio";
import accountHeader from "../components/profile/accountHeader";
import loading from "../components/loading";
import {mapGetters} from 'vuex'

export default {
  name: "profile",
  components: {
    tumbPost: () => import('../components/profile/tumbPost'),
    accountStatus, accountBio, accountHeader, loading
  },
  created() {
    this.$store.commit('toggleNavbar', true);
    this.$store.dispatch('getUserProfile').then(() => {
      this.isLoading = false
      this.$store.dispatch('getNotificationList')
    })
  },
  mounted() {
    var self = this
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        self.$store.commit('toggleProfileLoaded', false)
        self.$store.commit('toggleMyPostsLoaded', false)
        self.$store.dispatch('getUserProfile')
        self.$store.dispatch('getMyPosts')
      }
    });
    this.$store.commit('changeErrMsg', null)
    this.$store.dispatch('getCountsInProfile')
  },
  computed: {
    ...mapGetters(['notificatonsCalc'])
  },
  data(){
    return{
      isLoading: true
    }
  }
}
</script>

<style scoped>
body, html {
  overflow-x: hidden;
}

.bodyMargin {
  margin: 10px;
}

.notifIcon {
  position: absolute;
  z-index: 9;
  top: 167px;
  right: 1rem;
  font-size: 20px;
  color: #fff;
  box-shadow: none;
  border: 1px solid white;
}
.overlayLoad{
  position:fixed;
  top:0;
  right:0;
  background-color: var(--vs-navs);
  width:100%;
  height:100vh;
  z-index: 10;
}
.loader {
  margin-top: 30vh;
}

</style>