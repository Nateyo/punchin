<template>
  <v-layout column>
    <breadcrumbs :crumbs=breadcrumbs></breadcrumbs>
    <v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumbs from './Breadcrumbs.vue'

export default {
  name: 'Reports',
  components: {Breadcrumbs},
  data: function () {
    return {
      breadcrumbs: [
        {
          to: '/Home',
          text: 'Home'
        },
        {
          to: '/Admin',
          text: 'Admin'
        },
        {
          to: '/Reports',
          text: 'Reports'
        }
      ]
    }
  }
}
</script>

<style>
</style>