<template>
  <vs-row>
    <vs-col dir="auto" w="12">
      <p v-if="userProfile.biography != ''" class="bioText" style="text-align: left;white-space: pre-wrap;">
        {{ userProfile.biography }}
      </p>
      <p v-else class="bioText" style="text-align: left;white-space: pre-wrap;">On the movies planet</p>
    </vs-col>
  </vs-row>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "accountBio",
  computed: {
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