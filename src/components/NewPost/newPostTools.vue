<template>
  <div class="tools">
    <div class="top-tools">
      <div id="backDiv" @click="back">
        <div>
        <i class='iconify close' data-icon="mdi:close"></i>
        </div>
        <div style="padding-left: 20px; font-weight: 600;">
        New Post
        </div>
      </div>
      <div class="space">
      </div>
      <div class="buttons">
        <vs-button
            animation-type="vertical"
            class="sendPost"
            color="#999898"
            flat
            gradient
            @click="$emit('saveAsDraft')"
        >
          draft
        </vs-button>
        <vs-button
            id="saveBtn"
            :loading="isLoading"
            animation-type="vertical"
            class="sendPost"
            color="#5b3cc4"
            flat
            gradient
            @click="isLoading === false ? $emit('sendThePost') : console.log('wait')"
        >
          share
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newPostTools",
  methods: {
    back() {
      this.$router.push({name: 'profile'})
    }
  },
  props: ['isLoading']
}
</script>

<style scoped>
#backDiv{
  margin-left:10px;
  display: flex;
  align-items: center;
}
.floating-add-image {
  position: fixed;
  bottom: 10%;
  right: 2rem;
}

.tools >>> .floating-add-image {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.iconify {
  font-size: 1.6rem;
}

.top-tools {
  position: fixed;
  top: 0;
  right: 0;
  will-change: transform;
  transform: translateZ(0);
  height: 45px;
  width: 100%;
  background-color: #1e2023;
  display: flex;
  z-index: 999999999;
}

.close {
  width: 2rem;
  height: 2rem;
}

.sendPost {
  float: right;
  margin-right: 15%;
  margin-top: 7px;
  width: 50%;
}

#saveBtn {
  float: right;
  position: relative;
  right: 0;
}

.buttons {
  width: 45%;
  background-color: #1e2023;
  display: flex;
  position: absolute;
  right: 0;
  float: right;
}

.space {
  width: 45%;
}
</style>