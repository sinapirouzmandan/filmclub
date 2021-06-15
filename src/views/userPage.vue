<template>
  <div class="bodyMargin">
    <accountHeader/>
    <accountBio/>
    <accountStatus/>
  </div>
</template>
<script>
import accountStatus from "../components/userPage/accountStatus";
import accountBio from "../components/userPage/accountBio";
import accountHeader from "../components/userPage/accountHeader";
import {mapActions} from "vuex";
export default {
  name: "userPage",
  computed:{
    username(){
      return this.$route.params['user']
    }
  },
  components: {
    accountStatus,accountBio,accountHeader
  },
  created() {
    this.$store.commit('toggleNavbar',true);
    this.getUserById(this.username);
  },
  methods:{
    ...mapActions(['getUserById'])
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