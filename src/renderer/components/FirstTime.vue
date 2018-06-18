<template>
  <v-container>
    <v-content>
      <v-stepper v-model="page">
        <v-stepper-header>
          <v-stepper-step :complete="page > 1" step="1">Add Administrator</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="page > 2" step="2">Profile Picture</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Done</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <add-member forceAdmin=true @memberAdded="member_added"></add-member>
            <v-btn color="primary" @click.native="page = 2" :disabled="member_continue_disabled">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-5" height="200px">
              <v-avatar
                :tile="false"
                size="100"
                color="grey lighten-4"
              >
              <img v-bind:src="portrait" alt="avatar">
              </v-avatar>
            </v-card>
            <v-btn color="primary" @click.native="page = 3" :disabled="profile_picture_disabled">Continue</v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-5" height="200px">
              You're good to go.
            </v-card>
            <v-btn color="primary" @click="done">Continue</v-btn>
          </v-stepper-content>
      </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-container>
</template>

<script>
import AddMember from './forms/AddMember.vue'

export default {
  name: 'FirstTime',
  components: {AddMember},
  methods: {
    member_added: function (member) {
      this.member = member
      this.member_continue_disabled = false
    },
    done: function () {
      this.$router.push('/Home')
    }
  },
  data () {
    return {
      page: 0,
      member: null,
      portrait: 'static/portrait.png',
      member_continue_disabled: true,
      profile_picture_disabled: false
    }
  }
}
</script>

<style lang='scss'>
</style>