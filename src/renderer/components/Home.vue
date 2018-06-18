<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex xs3 md3 d-flex>
        <signed-in :members=members></signed-in>
      </v-flex>
      <v-flex>
        <v-card color="blue-grey">
          <v-card-title>A title.</v-card-title>
          <v-select
            :items="select_members"
            v-model="member"
            v-on:input="changeMember"
            label="Select"
            autocomplete
          ></v-select>
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
      members: null,
      member: null
    }
  },
  computed: {
    select_members: function () {
      let members = []
      this.members.forEach(member => {
        let member_obj = {}
        member_obj.text = member.last_name + ', ' + member.first_name + ' ' + member.middle_name
        member_obj.value = member.id
        members.push(member_obj)
      })

      return members
    }
  },
  methods: {
    changeMember: function (member) {
      console.log(member)
    }
  }
}
</script>

<style lang="scss">
</style>