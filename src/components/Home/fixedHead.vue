<template>
  <nav class="xi-top-head">
    <div class="logo">
      <h1>MovieBar</h1>
    </div>
  <switchExplorer/>
  </nav>
</template>

<script>
import switchExplorer from "./switchExplorer";
export default {
  name: "navbar",
  data(){
    return{
      activeSearch: "1",
      activeBookmark: "1",
      activeMovie: "1",
      activeUser: "1",
      activeHome: "0",
    }
  },
  components: {switchExplorer}
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/magic');
.xi-top-head{
  position: fixed;
  top: 0;
  right: 0;
  left:0;
  height: 50px;
  width:100%;
  background-color: #1e2023;
  display:flex;
  z-index: 999999999;
}
.logo h1{
float: left;
  margin-left: 30px;
  margin-top:17px;
  font-family:'magic', sans-serif;
}
</style>