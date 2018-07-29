<template>
  <v-container>
    <add-member forceAdmin=true @created="member_created"></add-member>
  </v-container>
</template>

<script>
import AddMember from './forms/AddMember.vue'

export default {
  name: 'FirstTime',
  components: {AddMember},
  methods: {
    member_created: function (member) {
      this.$router.push('/Home')
    }
  }
}
</script>

<style lang='scss'>
</style>