<template>
  <div id="app">
    <transition name="slide">
    <router-view/>
    </transition>
    <navbar v-if="showNavbar"></navbar>
  </div>
</template>

<style>
@font-face {
  font-family: 'Yekan';
  src: url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.woff') format('woff'),
  url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.ttf') format('truetype');
  font-weight: normal;
}
:root {
  --vs-gray-3: 0, 0, 0 !important;
  --vs-mainback: #1A1A1D;
  --vs-navs: #2c2f33;
  --vs-cardback: #121818;
  --vs-buttons: #5B3CC4;
  --vs-main-text: #fff;
  --vs-nav-icons: blue;
}

head, body {
  background-color: var(--vs-mainback);
  user-select: none;
  margin: 0;
  overscroll-behavior-y: contain;
  scroll-behavior: smooth;
  overflow-x: hidden;
}
.bodyMargin {
  margin: 10px;
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
.slide-leave-active,
.slide-enter-active {
  transition: 0.4s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slideback-leave-active,
.slideback-enter-active {
  transition: 1s;
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
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