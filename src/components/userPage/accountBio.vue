<template>
  <vs-row>
    <vs-col w="12">
      <p class="bioText" style="text-align: left;white-space: pre-wrap;" v-if="usernameInfo.biography != ''">
        {{usernameInfo.biography}}
      </p>
      <p v-else class="bioText" style="text-align: left;white-space: pre-wrap;">
        On the movies planet
      </p>
    </vs-col>
  </vs-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "accountBio",
  computed:{
    ...mapState(['usernameInfo'])
  }
}
</script>

<style scoped>
.bioText {
  margin-top: 1rem;
  font-size: 15px;
  max-width: 80%;
}
</style>