<template>
  <div id="app">
    <transition name="fade">
    <splashScreen v-if="splashScreenShow"/>
    </transition>
    <transition name="slide">
    <router-view/>
    </transition>
    <navbar v-if="showNavbar"></navbar>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import splashScreen from "./views/splashScreen";
import {mapState} from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    navbar,
    splashScreen
  },
  computed: {
    ...mapState(['showNavbar', 'splashScreenShow'])
  },
  mounted() {
    this.$vs.setColor('primary', '#5b3cc4')
    setTimeout(()=>{
      this.$store.commit('toggleSplashScreen')
    },3000)
  },
  created() {
    this.$store.commit('getTokenFromLocal')
  }
}
</script>


<style>
@font-face {
  font-family: 'magic';
  font-style: normal;
  font-weight: 400;
  src: local('magic'), url('https://fonts.cdnfonts.com/s/16829/magic dafont.woff') format('woff'),
  url('./assets/magic-dafont.woff') format('woff');
  font-display: block;
}
@font-face {
  font-family: 'Yekan';
  src: url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.woff') format('woff'),
  url('./assets/Yekan.woff') format('woff'),
  url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.ttf') format('truetype');
  font-weight: normal;
}
@font-face {
  font-family: 'Nazanin';
  src: url('https://cdn.fontcdn.ir/Font/Persian/Nazanin/Nazanin.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Nazanin/Nazanin.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.fontcdn.ir/Font/Persian/Nazanin/Nazanin.woff') format('woff'),
  url('./assets/Nazanin.woff') format('woff'),
  url('https://cdn.fontcdn.ir/Font/Persian/Nazanin/Nazanin.ttf') format('truetype');
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
  transition: 0.3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.fade-leave-active,
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>