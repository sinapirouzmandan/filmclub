<template>
  <div class="bodyMargin">
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
import accountStatus from "../components/profile/accountStatus";
import accountBio from "../components/profile/accountBio";
import accountHeader from "../components/profile/accountHeader";
import {mapGetters} from 'vuex'

export default {
  name: "profile",
  components: {
    tumbPost: () => import('../components/profile/tumbPost'),
    accountStatus, accountBio, accountHeader
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.commit('toggleNavbar', true);
    this.$store.dispatch('getUserProfile').then(() => {
      this.$store.dispatch('getNotificationList')
    })
  },
  computed: {
    ...mapGetters(['notificatonsCalc'])
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
</style>