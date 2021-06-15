<template>
<div class="bodyMargin">
<accountHeader/>
  <accountBio/>
  <accountStatus/>
      <tumb-post/>
</div>
</template>
<script>
import accountStatus from "../components/profile/accountStatus";
import accountBio from "../components/profile/accountBio";
import accountHeader from "../components/profile/accountHeader";
import {mapActions} from "vuex";
export default {
  name: "profile",
  components: {
    tumbPost: () => import('../components/profile/tumbPost'),
    accountStatus,accountBio,accountHeader
  },
  created() {
    this.$store.commit('toggleNavbar',true);
    this.getUserProfile();
  },
  methods:{
    ...mapActions(['getUserProfile'])
  }
}
</script>

<style scoped>
body,html{
  overflow-x: hidden;
}
.bodyMargin{
  margin: 10px;
}
</style>