<template>
<div class="bodyMargin">
<accountHeader/>
  <accountBio/>
  <accountStatus/>
  <keep-alive>
      <tumb-post/>
  </keep-alive>
</div>
</template>

<script>
import tumbPost from '../components/profile/tumbPost';
import accountStatus from "../components/profile/accountStatus";
import accountBio from "../components/profile/accountBio";
import accountHeader from "../components/profile/accountHeader";
export default {
  name: "profile",
  components: {tumbPost, accountStatus,accountBio,accountHeader
  },
  created() {
    this.$store.commit('toggleNavbar',true);
  }
}
</script>

<style scoped>
body,html{
  overflow-x: hidden;
}

</style>