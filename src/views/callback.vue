<template>
  <h1></h1>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
onMounted(() => {
  let code = window.location.search.split("=")[1]
  if (code){
    localStorage.setItem("code",code)
    window.close()
  }
})
</script>

<style scoped>

</style>