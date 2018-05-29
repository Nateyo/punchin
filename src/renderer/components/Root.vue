<template>
  <v-content>
    <button @click="test">Test</button>
  </v-content>
</template>

<script>
  let members = require('../db/models/members')
  export default {
    name: 'Root',
    components: {},
    methods: {
      test: function () {
        this.$router.push('/Home')
      }
    },
    created: function () {
      members.count().then(member_count => {
        if (member_count > 0) {
          this.$router.push('/Home')
        } else {
          this.$router.push('/FirstTime')
        }
      }).catch(error => {
        console.error(error)
      })
    }
  }
</script>

<style lang="scss">
</style>