<template>
  <div class="home">
    <vs-row>
      <single-post :number="post" v-for="(post,index)  in (1,20)" :key="index"></single-post>
    </vs-row>
    <p style="margin-bottom: 35px; opacity: 0.1; font-size:15px;">end of content ...</p>
  </div>
</template>

<script>
// @ is an alias to /src
import singlePost from '../components/singlePost'
export default {
  name: 'Home',
  components: {singlePost},
  data() {
    return{
      images:[]
    }
  },

}
</script>
<style scoped>
.btn-chat{
  background-color: #18191c !important;
}


</style>
<style scoped>

</style>
