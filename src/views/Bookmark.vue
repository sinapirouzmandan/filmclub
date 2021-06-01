<template>
<div class="bodyMargin">
  <div class="headerH2">
    <vs-avatar badge badge-color="success" size="70" style="margin: 0 auto;">
      <img src="../../public/img/avatar.jpg" alt="">
      <template #badge>
        28
      </template>
    </vs-avatar>
  <h2 style="display: inline-block;">watch list</h2>
  </div>
  <hr>
  <tumbPost cols="6"/>
</div>
</template>

<script>
import tumbPost from "../components/tumbPost";
export default {
  name: "Bookmark",
  components: {tumbPost}
}
</script>

<style scoped>
.headerH2{
margin-top: 1.5rem;
}
hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
</style>