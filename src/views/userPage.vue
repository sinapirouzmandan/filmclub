<template>
  <div class="bodyMargin">
    <accountHeader/>
    <accountBio/>
    <accountStatus/>
    <posts :username="username"/>
  </div>
</template>
<script>
import accountStatus from "../components/userPage/accountStatus";
import accountBio from "../components/userPage/accountBio";
import accountHeader from "../components/userPage/accountHeader";
import {mapActions} from "vuex";
import PullToRefresh from "pulltorefreshjs";

export default {
  name: "userPage",
  computed: {
    username() {
      return this.$route.params['user']
    }
  },
  components: {
    accountStatus, accountBio, accountHeader,
    posts: () => import('../components/userPage/posts')
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.commit('toggleNavbar', true);
    this.getUserById(this.username);
  },
  mounted() {
    var self = this
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        self.getUserById(self.username);
      }
    });
  },
  methods: {
    ...mapActions(['getUserById'])
  }
}
</script>