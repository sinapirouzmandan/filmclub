<template>
  <div id="follow">
    <loading v-if="isLoading"/>
    <div class="header">
      <div class="back" @click="$router.back()">
        <i class="iconify" data-icon="bx:bx-arrow-back"></i>
      </div>
      <div class="username">
        <p style="text-align: left;">Likes</p>
      </div>
    </div>
    <div id="users">
      <div v-for="(user) in likers" :key="user.username" class="user">
        <div class="containFullUser" @click="$router.push(`/users/${user.username}`)">
          <vs-avatar circle class="avatarImage">
            <img :src="user.avatar ? user.avatar : alternativeAvatar" alt="user avatar" class="fitImage">
          </vs-avatar>
          <div class="singleUser">
            <p class="nameInSingleUser">{{ user.username }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import loading from "../components/loading";
import PullToRefresh from "pulltorefreshjs";

export default {
  name: "followView",
  metaInfo: {
    title: 'Likes',
    titleTemplate: '%s | FilmClub'
  },
  data() {
    return {
      isLoading: false
    }
  },
  components: {loading},
  computed: {
    ...mapState(['likers', 'alternativeAvatar', 'baseURl'])
  },
  methods: {
    ...mapActions(['getLikersList'])
  },
  mounted() {
    var self = this
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        self.getLikersList(self.$route.params.postID)
      }
    });
  },
  created() {
    this.isLoading = true
    this.getLikersList(this.$route.params.postID).then(() => {
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.singleUser {
  padding-bottom: 5px;
}

.back {
  margin-left: 10px;
  font-size: 25px;
}

.username {
  margin-left: 20px;
  font-size: 20px;
}

#follow >>> p {
  text-align: left;
  margin-left: 20px;
}

.avatarImage {
  float: left;
  margin-right: 20px;
  margin-left: 20px;
}

.nameInSingleUser {
  padding-top: 10px;
}

.containFullUser {
  width: 60%;
  height: 100%;
}

.fitImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>