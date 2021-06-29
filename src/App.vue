<template>
  <div id="app">
    <router-view/>
    <navbar v-if="showNavbar"></navbar>
  </div>
</template>

<style>
:root {
  --vs-gray-3: 0, 0, 0 !important;
  --vs-mainback: #1A1A1D;
  --vs-navs: #293337;
  --vs-cardback: #121818;
  --vs-buttons: #5B3CC4;
  --vs-main-text: #fff;
  --vs-nav-icons: blue;
}

head, body {
  background-color: var(--vs-mainback);
  user-select: none;
  overflow: auto;
  overflow: initial;
  margin: 0;
  overscroll-behavior-y: contain;
}

.bodyMargin {
  margin: 6px;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #34373d;
}

img {
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

img {
  color: rgba(0, 0, 0, 0) !important;
}
</style>
<script>
import navbar from "./components/navbar";
import {mapState} from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    navbar
  },
  computed: {
    ...mapState(['showNavbar'])
  },
  mounted() {
    this.$vs.setColor('primary', '#5b3cc4')
  },
  created() {
    this.$store.commit('getTokenFromLocal')
  }
}
</script>