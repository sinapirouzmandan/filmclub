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
  <bookmarkPost/>
  <p style="margin-bottom: 35px; opacity: 0.1; font-size:15px;">end of content ...</p>
</div>
</template>

<script>
import bookmarkPost from "../components/bookmarkPost";
export default {
  name: "Bookmark",
  components: {bookmarkPost}
}
</script>

<style scoped>
.headerH2{
margin-top: 1.5rem;
}
hr {
  border: 0;
  height: 1px;
}
</style>