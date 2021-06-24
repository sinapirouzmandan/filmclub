<template>
  <div id="control">
    <div class="center con-switch">
      <vs-switch v-model="active">
        <template #off>
          No filter
        </template>
        <template #on>
          following
        </template>
      </vs-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: "switchExplorer",
  data: () => ({
    active: false
  })
}
</script>

<style scoped>
#control >>> .vs-switch {
  background-color: var(--vs-buttons) !important;
  height: 30px;

}

#control >>> .vs-switch__circle {
  background-color: #3d3c3c !important;
  border-radius: 50% !important;
  box-shadow: -3px 0px 20px 0px rgba(0, 0, 0, 0.4) !important;
}

.con-switch {
  width: 100px;
  position: absolute;
  right: 10px;
  top: 10px;
}

vs-switch__text off {
  color: white !important;
}
</style>