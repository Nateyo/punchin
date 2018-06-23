<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap fill-height="true">
      <v-flex xs3 md3 d-flex>
        <signed-in :members=signed_in></signed-in>
      </v-flex>
      <v-flex d-flex>
        <v-card color="blue-grey">
          <v-card-title>A title.</v-card-title>
          <v-card-text>
            <v-select
              ref='r_select_member'
              :items="select_members"
              v-model="member"
              v-on:input="changeMember"
              label="Member Name"
              autocomplete
            ></v-select>
            <v-btn color="info" v-bind:disabled="in_disabled" @click="punch_in">IN</v-btn>
            <v-btn color="info" v-bind:disabled="out_disabled" @click="punch_out">OUT</v-btn>
            <v-btn color="info" v-if="show_admin">ADMIN</v-btn>
          </v-card-text>
        </v-card>
        <v-snackbar
          :timeout="snackbar_action_timeout"
          bottom
          right
          v-model="snackbar_action"
          >
          <v-flex fill-height="true" align-center="true">
            {{ snackbar_action_text }}
          </v-flex>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SignedIn from './SignedIn.vue'
let member_func = require('../db/func/members').default
let punch_cards_func = require('../db/func/punch_cards').default

export default {
  name: 'Home',
  components: {SignedIn},
  beforeCreate () {
    member_func.fetchAll(true).then(members => {
      this.members = members
    })
  },
  mounted () {
    this.update_signed_in()
  },
  data: function () {
    return {
      members: [],
      signed_in: [],
      member: null,
      in_disabled: false,
      out_disabled: false,
      show_admin: false,
      snackbar_action: false,
      snackbar_action_text: null,
      snackbar_action_timeout: 3000
    }
  },
  computed: {
    select_members: function () {
      let members = []
      this.members.forEach(member => {
        let member_obj = {}
        member_obj.text = `${member.last_name}, ${member.first_name} ${member.middle_name}`
        member_obj.value = member
        members.push(member_obj)
      })

      return members
    }
  },
  methods: {
    changeMember: function () {
      this.update_status()
      this.update_signed_in()
    },
    punch_in: function () {
      punch_cards_func.punch_in(this.member.id).then(punched_in => {
        this.snackbar_action_text = `${this.member.last_name}, ${this.member.first_name} punched in.`
        this.snackbar_action = true
        this.$refs.r_select_member.reset()
      })
    },
    punch_out: function () {
      punch_cards_func.punch_out(this.member.id).then(punched_out => {
        this.snackbar_action_text = `${this.member.last_name}, ${this.member.first_name} punched out.`
        this.snackbar_action = true
        this.$refs.r_select_member.reset()
      })
    },
    update_signed_in: function () {
      punch_cards_func.signed_in().then(signed_in => {
        this.signed_in = []
        signed_in.forEach(punch_card => {
          if (punch_card.action === 'in') {
            this.signed_in.push(punch_card.member)
          }
        })
      }).catch(error => {
        console.error(error)
      })
    },
    update_status: function () {
      if (this.member !== null) {
        if (this.member.is_administrator) {
          this.show_admin = true
        } else {
          this.show_admin = false
        }
        punch_cards_func.punch_status(this.member.id).then(status => {
          if (status === 'in') {
            this.in_disabled = true
            this.out_disabled = false
          } else {
            this.out_disabled = true
            this.in_disabled = false
          }
        })
      } else {
        this.in_disabled = true
        this.out_disabled = true
        this.show_admin = false
      }
    }
  }
}
</script>

<style lang="scss">
</style>