<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex>
        <signed-in :members=members></signed-in>
      </v-flex>
      <v-flex>
        <v-card color="blue-grey">
          <v-card-title>A title.</v-card-title>
          <v-card-text>Some text</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SignedIn from './SignedIn.vue'
let member_func = require('../db/func/members').default

export default {
  name: 'Home',
  components: {SignedIn},
  created () {
    member_func.fetchAll(true).then(members => {
      this.members = members
    })
  },
  data: function () {
    return {
      members: null
    }
  },
  methods: {}
}
</script>

<style lang="scss">
</style>