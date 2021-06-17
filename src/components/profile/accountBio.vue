<template>
  <vs-row>
    <vs-col w="12" dir="auto">
      <p class="bioText" style="text-align: left;white-space: pre-wrap;"  v-if="userProfile.biography != ''">
{{userProfile.biography}}
      </p>
      <p v-else class="bioText" style="text-align: left;white-space: pre-wrap;">On the movies planet</p>
    </vs-col>
  </vs-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "accountBio",
  computed:{
    ...mapState(['userProfile'])
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