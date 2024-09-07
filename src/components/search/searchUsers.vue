<template>
  <div class="container bodyMargin">
    <div v-for="(user, index) in searchedUsers" :key="index">
      <router-link :to="'/users/' + user.username" class="whiteTxt">
        <div class="user">
          <div class="divider"></div>
          <div class="avatar">
            <img :src="user.avatar ? (baseURl + user.avatar) : alternativeAvatar" alt="avatar" class="usersAvatar"/>
          </div>
          <p>
            {{ user.username }}
            <br/>
            <i class="bio" style="text-align: left">{{ user.biography }} ...</i>
          </p>
          <div class="divider bottom"></div>
        </div>
      </router-link>
    </div>
    <loading v-if="isLoading"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import loading from "../loading";

export default {
  name: "searchUsers",
  computed: {
    ...mapState(["searchedUsers", "baseURl", 'alternativeAvatar'])
  },
  components: {loading},
  props: ["isLoading"]
};
</script>

<style scoped>

.user {
  width: 94%;
  height: 3rem;
  padding: 15px;
}

.divider {
  width: 100%;
  height: 1px;
  width: 90%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(85, 84, 84, 0.31),
      rgba(255, 255, 255, 0)
  );
}

.bottom {
  margin-top: 4rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  background-color: var(--vs-mainback);
  float: left;
  margin-top: 0.5rem;
  border-radius: 50%;
}

.user p {
  float: left;
  margin-left: 0.5rem;
  text-align: left;
}

.user .bio {
  font-size: 11px;
  opacity: 0.7;
  float: left;
}

.avatar img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
}

.whiteTxt {
  color: white;
  font-weight: 550;
}
</style>