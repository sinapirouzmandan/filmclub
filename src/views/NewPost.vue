<template>
<div>
<newPostTools/>
</div>
</template>

<script>
import newPostTools from "../components/newPostTools";
export default {
  name: "NewPost",
  created() {
    this.$store.commit('toggleNavbar',false);
  },
  components:{newPostTools}
}
</script>

<style scoped>

</style>