<template>
  <nav class="xi-bottom-navbar">
    <router-link class="nav-a" to="/">
      <vs-button
          :active="$route.name === 'Home'"
          dark
          flat
          icon
      >
        <i class="iconify" data-icon="bx:bxs-home" data-inline="false"></i>
      </vs-button>
    </router-link>
    <router-link class="nav-a" to="/search">
      <vs-button
          :active="$route.name === 'search'"
          dark
          flat
          icon
      >
        <i class="iconify" data-icon="bx:bx-search-alt" data-inline="false"></i>
      </vs-button>
    </router-link>
    <router-link class="nav-a" to="/NewPost">
      <vs-button
          :active="$route.name === 'NewPost'"
          dark
          flat
          icon
      >
        <i class="iconify" data-icon="mdi:movie-open-plus" data-inline="false"></i>
      </vs-button>
    </router-link>
    <router-link class="nav-a" to="/MyList">
      <vs-button
          :active="$route.name === 'MyList'"
          dark
          flat
          icon
      >
        <i class="iconify" data-icon="bx:bxs-bookmark" data-inline="false"></i>
      </vs-button>
    </router-link>
    <router-link class="nav-a" to="/profile">
      <vs-button
          :active="$route.name === 'profile'"
          dark
          flat
          icon
      >
        <div v-show="notificatonsCalc" class="badge"></div>
        <i class="iconify" data-icon="bx-bxs-user" data-inline="false"></i>
      </vs-button>
    </router-link>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'

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
  },
  computed: {
    ...mapGetters(['notificatonsCalc'])
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

.nav-a {
  flex-grow: 2.4;
  display: flex;
  justify-content: center;
}

.badge {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  bottom: 28px;
  margin-left: 28px;
  animation: badge 1s linear infinite;
}

@keyframes badge {
  0% {
    background-color: var(--vs-navs);
  }
  100% {
    background-color: #4b77ff;
  }
}
</style>