<template>
  <div class="tools">
    <div class="top-tools">
          <div @click="back" id="backDiv">
            <i class='iconify close' data-icon="mdi:close"></i>
          </div>
      <div class="space"></div>
      <div class="buttons">
        <vs-button
            @click="$emit('saveAsDraft')"
            animation-type="vertical"
            class="sendPost"
            color="#999898"
            flat
            gradient
        >
          draft
        </vs-button>
          <vs-button
              @click="isLoading === false ? $emit('sendThePost') : console.log('wait')"
              animation-type="vertical"
              class="sendPost"
              flat
              :loading="isLoading"
              color="#5b3cc4"
              gradient
              id="saveBtn"
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
  margin-top: 0.5rem;
  margin-left: 1.5rem;
}

.sendPost {
  float: right;
  margin-right: 15%;
  margin-top: 7px;
  width:50%;
}
#saveBtn{
  float: right;
  position: relative;
  right:0;
}
.buttons{
  width:45%;
  background-color: #1e2023;
  display: flex;
  position: absolute;
  right:0;
  float: right;
}
.space{
  width:45%;
}
</style>