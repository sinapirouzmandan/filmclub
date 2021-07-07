<template>
  <div id="tumber">
    <loading v-if="isLoading"/>
    <vs-row class="tumbPostRow">
      <vs-col v-for="(post,index) in userPosts" :key="index" class="tumbContainer" w="6" xs="12">
        <vs-card type="3" @click="$router.push(`/post/${post.title}/${post.id}`)">
          <template #title>
            <h3>{{post.title}}</h3>
          </template>
          <template #img>
            <img v-lazy="post.poster" alt="image">
          </template>
          <template #text>
            <p>
              {{post.body | sanitize}}
            </p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class="iconify" data-icon='bx:bxs-heart'></i>
              <span>
            {{post.likes}}
          </span>
            </vs-button>
            <vs-button class="btn-chat" primary shadow style="color: white">
              <i class="iconify" data-icon='bx:bx-chat'></i>
              <span class="span">
           {{post.comments}}
        </span>
            </vs-button>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
    <p style="margin-bottom: 50px; opacity: 0; font-size:15px;">end of content ...</p>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import loading from '../loading'
export default {
  name: "posts",
  data(){
    return {
      isLoading: false
    }
  },
  methods:{
    ...mapActions(['getUserPosts'])
  },
  computed:{
    ...mapState(['userPosts'])
  },
  mounted(){
    this.isLoading = true
    this.getUserPosts(this.username).then(()=>{
      this.isLoading = false
    })
  },
  components: {
    loading
  },
  props: ['username']
}
</script>

<style scoped>
.tumbPostRow {
  margin-top: 35px;
}

#tumber >>> .vs-card {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  color: white;
}
</style>