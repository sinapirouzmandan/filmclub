<template>
  <div class="writeBox">
    <newPostTools/>
    <div class="headerImage">
      <div class="xinu">
        <vs-button
            :active="true"
            flat
        >
          specify Post header image
        </vs-button>
      </div>
      <div class="rating">
        <vs-row>
        </vs-row>
        <vs-input v-model="score" :state="state" danger icon-after label-placeholder="My score to : " type="number"
                  @change="checkRate()" warn>
          <template #icon>
            /10
          </template>
        </vs-input>
        <vs-switch v-model="active" class="margin-2">
          has spoilers
        </vs-switch>
        <vs-switch v-model="active" class="margin-2">
          is critic
        </vs-switch>
      </div>
    </div>
    <h1 style="margin-top: 2rem;">{{ title }}</h1>
    <div class="editorContainer" dir="auto">
    <div id="editor" dir="rtl">
    </div>
    </div>
    </div>
</template>

<script>
import newPostTools from "./newPostTools";
import swal from 'sweetalert'
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
export default {
  name: "postDetail",
  props: ['id', 'title'],
  data() {
    return {
      score: null,
      state: 'warn'
    }
  },
  methods: {
    checkRate() {
      if (1 <= Number(this.score) && Number(this.score) <= 10){
        this.state = 'success'
      }
      else {
        swal('Score should be between 1  and 10')
        this.state = 'danger'
      }
    }
  },
  created() {
    if (this.id == undefined || this.title == undefined) {
      this.$router.push({name: 'NewPost'})
    }
    this.$store.commit('toggleNavbar',false);
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const editor = new EditorJS({
      holder: 'editor',
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
            }
          }
        }
      }
    })
  },
  components: {newPostTools}
}
</script>

<style scoped>
.headerImage {
  width: 100%;
  max-width: 500px;
  height: 250px;
  margin: 0 auto;
  background: url('https://i.stack.imgur.com/y9DpT.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.xinu {
  margin-top: 230px;
  color: black;
  font-size: 20px;
}

.rating {
  width: 100px;
  position: absolute;
  top: 380px;
}
.writeBox >>> .vs-input{
  width: 100px;
}
h1{
  font-size: 20px;
}
.editorContainer{
  width: 90%;
  min-height:500px;
  height: auto;
  margin-left: 5%;
  margin-top: 15rem;
  border: 2px dotted #5b3cc4;
  padding: 10px;
  text-align: right;
  font-width: 700;
}
.margin-2{
  margin-top: 1rem;
}
.writeBox >>> .vs-switch{
  background-color: #8e949c;;
}
</style>