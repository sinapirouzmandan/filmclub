<template>
  <div class="home bodyMargin">
    <fixedHead/>
    <vs-row>
      <single-post :number="post" v-for="(post,index)  in (1,20)" :key="index"></single-post>
    </vs-row>
    <p style="margin-bottom: 35px; opacity: 0.1; font-size:15px;">end of content ...</p>
  </div>
</template>

<script>
import fixedHead from "../components/fixedHead";
import singlePost from '../components/singlePost'
export default {
  name: 'Home',
  components: {singlePost,fixedHead},
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
.home{
  margin-top: 1.5rem;
}

</style>
<style scoped>

</style>
