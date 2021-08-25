<template>
  <div id="app">
    <transition name="fade">
    <splashScreen v-if="splashScreenShow"/>
    </transition>
    <transition name="slide">

    <router-view/>
    </transition>
    <navbar v-show="showNavbar"></navbar>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import splashScreen from "./views/splashScreen";
import {mapState, mapActions} from 'vuex'
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
  methods:{
    ...mapActions(['subscribeToNajva', 'subscribeToNajvaApp']),
   readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
  },
  mounted() {
    var self= this
    window.najvaUserSubscribed = function(najva_user_token){
        self.subscribeToNajva(najva_user_token)
    }
    this.$vs.setColor('primary', '#5b3cc4')
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.$store.commit('toggleSplashScreen')
    }
    else {
      setTimeout(()=>{
        this.$store.commit('toggleSplashScreen')
      },3000)
    }
    setInterval(()=>{ this.$store.dispatch('getNotificationList') }, 120000);
    try {
      if (this.$route.query['najva-app-token'] && localStorage.getItem('filmclub-najva') !== this.$route.query['najva-app-token']) {
        this.subscribeToNajvaApp(this.$route.query['najva-app-token'])
      }
      let self = this
      if (!localStorage.getItem('filmclub-najva')) {
        var open = indexedDB.open("najva-native-subscription-database");
        open.onerror = function() {
          console.log("Error loading database");
        }
        // eslint-disable-next-line no-unused-vars
        open.onsuccess = function(event) {
          var db = open.result;
          var transaction = db.transaction(["token"]);
          var objectStore = transaction.objectStore("token");
          var request = objectStore.get('najva_token');
          request.onerror = function() {
            console.log('err najva')
          };
          request.onsuccess = function() {
            self.subscribeToNajva(request.result.value)
          };
        }
      }
    }
    catch(e) {
      console.log(e)
    }

  },
  created() {
    let botPattern = "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
    let re = new RegExp(botPattern, 'i');
    let userAgent = navigator.userAgent;
    if (re.test(userAgent)) {
      this.$store.dispatch('botLogin')
    }
    this.$store.commit('getTokenFromLocal')
    //compatibility test
    let indexedDb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDb) {
      this.$vs.notification({
        duration: 9000,
        progress: 'auto',
        border: null,
        position: 'bottom-center',
        color: '#5b3cc4',
        title: "You're browser does not support our platform. get the latest version of chrome or firefox. \n If you still face any problem contact us at support@filmclub.top",
      })
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
*{
  font-family: 'Roboto', sans-serif;
}
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
  src: url('./assets/yekan.ttf');
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
.linkified {
  color: #bccdea;
  text-decoration: none;
}
head, body {
  background-color: var(--vs-mainback);
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