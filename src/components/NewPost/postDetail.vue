<template>
<div>
  <h1>title: {{title}}</h1>
  <h2>imdbId: {{id}}</h2>
</div>
</template>

<script>
export default {
  name: "postDetail",
  props:['id','title'],
  created() {
    if (this.id == undefined || this.title == undefined){
      this.$router.push({name: 'NewPost'})
    }
    this.$store.commit('toggleNavbar',false);
  }
}
</script>

<style scoped>

</style>