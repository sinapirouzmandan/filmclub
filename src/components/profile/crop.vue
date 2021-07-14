<template>
<div id="cropContainer" v-show="firstShow">
    <div class="header">
      <div @click="$emit('close')">
      <i class="iconify" data-icon="mdi:close" id="close"></i>
      </div>
      <div @click="sendImage">
      <i class="iconify" data-icon="mdi:check" id="check"></i>
      </div>
      <croppa
          id="croppaImage"
          v-model="croppa"
          disable-click-to-choose
          :width="browserWidth"
          placeholder=""
          :height="location === 'header' ? 100 : browserWidth"
          accept="image/*"
          :prevent-white-space="true"
          :remove-button-size="25"
          remove-button-color="black"/>
    </div>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "crop",
  data() {
    return {
      croppa: null,
      firstShow:true
    }
  },
  methods: {
    ...mapActions(['updateProfilePhoto', 'getUserProfile']),
    sendImage() {
      if (this.croppa) {
        this.$emit('profileChange')
        this.firstShow =false
      this.croppa.generateBlob((image) => {
          let formData = new FormData();
          formData.append(this.location, image);
          let imageInfo = []
          imageInfo.image = formData;
          imageInfo.location = this.location;
          this.updateProfilePhoto(imageInfo).then(()=>{
            this.$emit('profileChange')
            this.$emit('close')
          }).catch(()=>{
            this.$emit('profileChange')
            this.$emit('close')
          })
      }, 'image/jpg', 0.7)
    }
    }
  },
  mounted() {
    this.croppa.chooseFile()
  },
  computed:{
    browserWidth() {
      if (this.location === 'header') {
        return 0.85 * window.innerWidth
      }
      else {
        if (window.innerWidth < 500) {
          return 0.85 * window.innerWidth
        }
        else {
          return 300
        }
      }
    }
  },
  props: {
    location: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
#cropContainer{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  background-color: var(--vs-mainback);
  width:100%;
  height:100vh;
  padding-top:1rem;
  padding-right: 2rem;
  padding-left: 2rem;
  box-sizing: border-box;
}
.header {
  font-size: 30px;
}
#close {
  text-align: left;
  float: left;
}
#check {
  text-align: right;
  float: right;
}
#croppaImage{
  margin-top: 25vh;
}
</style>