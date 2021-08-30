<template>
  <vs-row>
    <vs-col dir="auto" w="12">
      <p v-if="userProfile.biography" v-linkified class="bioText" style="text-align: left;white-space: pre-wrap;"
         v-html="userProfile.biography">
      </p>
      <p v-else class="bioText" style="text-align: left;white-space: pre-wrap;">On the movies planet</p>
    </vs-col>
  </vs-row>
</template>
<style>
</style>
<script>
import {mapState} from 'vuex'

export default {
  name: "accountBio",
  computed: {
    ...mapState(['userProfile'])
  }
}
</script>