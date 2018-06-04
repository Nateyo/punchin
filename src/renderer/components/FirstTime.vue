<template>
  <v-container>
    <v-content>
      This is the first time page.
      <add-member></add-member>
    </v-content>
  </v-container>
</template>

<script>
import AddMember from './forms/AddMember.vue'

export default {
  name: 'FirstTime',
  components: {AddMember},
  methods: {}
}
</script>

<style lang='scss'>
</style>