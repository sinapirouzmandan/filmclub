<template>
  <vs-row class="statusBar">
    <vs-col w="4">0 followers</vs-col>
    <vs-col w="4">0 following</vs-col>
    <vs-col w="4">0 posts</vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "accountStatus"
}
</script>

<style scoped>
.statusBar{
  margin-top: 15px;
}
</style>