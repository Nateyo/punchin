<template>
  <div id="app">
    <v-app id="punchin">
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'punchin'
  }
</script>

<style>
  /* TODO: Don't pull from CDN */
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* CSS */
</style>
