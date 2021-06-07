<template>
  <div class="papa">
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:mail"></i>
      <vs-input placeholder="Email or Phone number">
        <template #icon>
          <i class='iconify' data-icon="mdi:contacts"></i>
        </template>
      </vs-input>
      <vs-button
          class="next"
          color="#5b3cc4"
          gradient
          @click="$emit('doneMail')"
      >
        <i class="iconify" data-icon="bx:bx-right-arrow-alt"></i> next
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "mailOrPhone"
}
</script>

<style scoped>
.papa >>> .vs-input{
  background-color: #171b1d !important;
  width: 100%;
  color:white;

}
.papa  >>> .vs-input__label{
  width: 60%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.username{
  margin-top: 12rem;

}
.papa >>> .vs-input-parent{
  flex-direction: row;
}
.papa >>> .vs-input-content{
  width: 80%;
  max-width: 500px;
}
.papa >>> .vs-input__icon{
  background-color: #151718 !important;
}
.logoUser{
  font-size: 70px;
  margin-bottom: 1.5rem;
}
.next{
  margin: 2.5rem auto 0;
}
.papa >>> .vs-button{
  width:80%;
  max-width: 500px;
}
</style>