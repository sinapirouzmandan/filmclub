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
import tumbPost from '../components/tumbPost';
import accountStatus from "../components/accountStatus";
import accountBio from "../components/accountBio";
import accountHeader from "../components/accountHeader";
export default {
  name: "profile",
  components: {tumbPost, accountStatus,accountBio,accountHeader
  }
}
</script>

<style scoped>
body,html{
  overflow-x: hidden;
}

</style>