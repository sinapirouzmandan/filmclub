<template>
<nav class="xi-bottom-navbar">
  <vs-button
    to="/"
    flat
    icon
    dark
    :active="activeHome"
    @click="activeHome = true; activeSearch=false; activeMovie=false;activeBookmark=false;activeUser=false"
    >
    <i class="iconify" data-icon="bx:bxs-home" data-inline="false"></i>
  </vs-button>
  <vs-button
      to="/search"
      flat
      icon
      dark
      :active="activeSearch"
      @click="activeHome = false; activeSearch=true; activeMovie=false;activeBookmark=false;activeUser=false;"
  >
    <i class="iconify" data-icon="bx:bx-search-alt" data-inline="false"></i>
  </vs-button>
  <vs-button
      to="/NewPost"
      flat
      icon
      dark
      :active="activeMovie"
      @click="activeHome = false; activeSearch=false; activeMovie=true;activeBookmark=false;activeUser=false"
  >
    <i class="iconify" data-icon="mdi:movie-open-plus" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      to="/MyList"
      icon
      dark
      :active="activeBookmark"
      @click="activeHome = false; activeSearch=false; activeMovie=false;activeBookmark=true;activeUser=false"
  >
    <i class="iconify" data-icon="bx:bxs-bookmark-star" data-inline="false"></i>
  </vs-button>
  <vs-button
      to="/profile"
      flat
      icon
      dark
      :active="activeUser"
      @click="activeHome = false; activeSearch=false; activeMovie=false;activeBookmark=false;activeUser=true;"
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
      activeSearch: false,
      activeBookmark: false,
      activeMovie: false,
      activeUser: false,
      activeHome: false
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
  background-color: var(--vs-navs);
  display:flex;
  z-index: 99;

}
.vs-button{
  flex-grow: 1;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent !important;
  color:var(--vs-nav-icons);
  transition: 0.4s;
}
.vs-button--flat.vs-button--dark{
  color:white !important;
}
.vs-button--active {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  transition: 0.5s;
}
</style>