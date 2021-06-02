<template>
  <div id="control">
  <div class="center con-switch">
    <vs-switch v-model="active">
      <template #off>
        Show following and others
      </template>
      <template #on>
        Just following
      </template>
    </vs-switch>
  </div>
  </div>
</template>

<script>
export default {
  name: "switchExplorer",
  data:() =>({
    active: false
  }),
  mounted() {
    this.$vs.setColor('primary', '#5b3cc4')
  }
}
</script>

<style scoped>
#control >>> .vs-switch{
  background-color: black !important;
  height: 40px;
}
#control >>> .vs-switch__circle{
  background-color: #3d3c3c !important;
  border-radius: 50% !important;
  box-shadow: -3px 0px 20px 0px rgba(0, 0, 0, 0.4) !important;
}
.con-switch{
  width: 200px;
  margin: 30px auto;
}
#control >>> .vs-component--primary{
  background-color: blue;
}
:root {
  --vs-primary: 91, 60, 196 !important
}
vs-switch__text off{
  color: white !important;
}
</style>