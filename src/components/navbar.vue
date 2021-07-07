<template>
  <nav class="xi-bottom-navbar">
    <vs-button
        :active="activeHome"
        dark
        flat
        icon
        @click="activeHome = true; activeSearch=false; activeMovie=false;activeBookmark=false;activeUser=false"
        to="/"
    >
      <i class="iconify" data-icon="bx:bxs-home" data-inline="false"></i>
    </vs-button>
    <vs-button
        :active="activeSearch"
        dark
        flat
        icon
        @click="activeHome = false; activeSearch=true; activeMovie=false;activeBookmark=false;activeUser=false;"
        to="/search"
    >
      <i class="iconify" data-icon="bx:bx-search-alt" data-inline="false"></i>
    </vs-button>
    <vs-button
        :active="activeMovie"
        dark
        flat
        icon
        @click="activeHome = false; activeSearch=false; activeMovie=true;activeBookmark=false;activeUser=false"
        to="/NewPost"
    >
      <i class="iconify" data-icon="mdi:movie-open-plus" data-inline="false"></i>
    </vs-button>
    <vs-button
        :active="activeBookmark"
        dark
        flat
        icon
        @click="activeHome = false; activeSearch=false; activeMovie=false;activeBookmark=true;activeUser=false"
        to="/MyList"
    >
      <i class="iconify" data-icon="bx:bxs-bookmark-star" data-inline="false"></i>
    </vs-button>
    <vs-button
        :active="activeUser"
        dark
        flat
        icon
        @click="activeHome = false; activeSearch=false; activeMovie=false;activeBookmark=false;activeUser=true;"
        to="/profile"
    >
      <i class="iconify" data-icon="bx-bxs-user" data-inline="false"></i>
    </vs-button>

  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
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
.xi-bottom-navbar {
  position: fixed;
  bottom: 0;
  right: 0;
  will-change: transform;
  transform: translateZ(0);
  height: 50px;
  width: 100%;
  background-color: var(--vs-navs);
  display: flex;
  z-index: 99;

}

.vs-button {
  flex-grow: 1;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent !important;
  color: var(--vs-nav-icons);
  transition: 0.4s;
}

.vs-button--flat.vs-button--dark {
  color: white !important;
}

.vs-button--active {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  transition: 0.5s;
}
</style>