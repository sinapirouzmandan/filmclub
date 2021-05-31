<template>
<nav class="xi-bottom-navbar">
  <vs-button
    to="/"
    flat
    circle
    icon
    :active="activeHome == 0"
    @click="activeHome = 0; activeSearch=1; activeMovie=1;activeBookmark=1;activeUser=1"
    >
    <i class="iconify" data-icon="bx:bxs-home" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="activeSearch == 0"
      @click="activeHome = 1; activeSearch=0; activeMovie=1;activeBookmark=1;activeUser=1"
  >
    <i class="iconify" data-icon="bx:bx-search-alt" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="activeMovie == 0"
      @click="activeHome = 1; activeSearch=1; activeMovie=0;activeBookmark=1;activeUser=1"
  >
    <i class="iconify" data-icon="bx:bxs-movie" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="activeBookmark == 0"
      @click="activeHome = 1; activeSearch=1; activeMovie=1;activeBookmark=0;activeUser=1"
  >
    <i class="iconify" data-icon="bx:bxs-bookmark-star" data-inline="false"></i>
  </vs-button>
  <vs-button
      to="/profile"
      flat
      icon
      :active="activeUser == 0"
      @click="activeHome = 1; activeSearch=1; activeMovie=1;activeBookmark=1;activeUser=0"
  >
    <i class="iconify" data-icon="bx-bxs-user" data-inline="false"></i>
  </vs-button>
</nav>
</template>

<script>
export default {
  name: "navbar",
  data(){
    return{
      activeSearch: "1",
      activeBookmark: "1",
      activeMovie: "1",
      activeUser: "1",
      activeHome: "0"
    }
  }
}
</script>

<style scoped>
.xi-bottom-navbar{
  position: fixed;
  bottom: 0;
  right: 0;
  will-change: transform;
  transform: translateZ(0);
  height: 50px;
  width:100%;
  background-color: #1e2023;
  display:flex;
  z-index: 999999999;

}
.vs-button{
  flex-grow: 1;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent !important;
  color:white;
}
.vs-button--active {
  border-top: 1px solid black;
}
.vs-button:checked{
  background-color: white;
}
</style>