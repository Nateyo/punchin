<template>
  <v-layout row wrap>
    <v-flex xs3 md3 d-flex>
      <signed-in :members=signed_in></signed-in>
    </v-flex>
    <v-flex d-flex>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap justify-center="true">
          <v-flex xs7 md7>
            <v-card>
              <v-card-text>
                <v-select
                  ref='r_select_member'
                  :items="select_members"
                  v-model="member"
                  v-on:input="changeMember"
                  label="Find User"
                  clearable
                  autocomplete
                ></v-select>
                <v-tooltip bottom>
                  <v-btn slot="activator" color="info" v-bind:disabled="in_disabled" @click="punch_in">IN</v-btn>
                  <span>Punch-in to the system</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-btn slot="activator" color="info" v-bind:disabled="out_disabled" @click="punch_out">OUT</v-btn>
                  <span>Punch-out of the system</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-btn slot="activator" color="info" v-if="show_admin" @click="dialog_admin = true">ADMIN</v-btn>
                  <span>Access to administrative functions</span>
                </v-tooltip>
              </v-card-text>
            </v-card>
            <v-dialog v-model="dialog_admin" max-width="500px">
              <v-card>
                <v-card-title>
                  Admin
                </v-card-title>
                <v-card-text>
                  <v-form ref='admin_auth_form' v-model='admin_form_valid' validation>
                    <v-text-field
                      v-model='password'
                      label='Password'
                      :append-icon="show_password ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (show_password = !show_password)"
                      :type="show_password ? 'text' : 'password'"
                      :rules="rule_password"
                      min=10
                      required
                    ></v-text-field>
                  </v-form>
                  <v-alert :value="password_alert" type="error">
                    The password you entered was incorrect.
                  </v-alert>
                  <v-alert :value="password_alert_success" type="success">
                    Success!
                  </v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" flat @click.stop="dialog_admin = false">Cancel</v-btn>
                  <v-btn color="primary" flat :disabled="!admin_form_valid" @click="check_admin">Submit</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
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
      in_disabled: true,
      out_disabled: true,
      show_admin: false,
      dialog_admin: false,
      snackbar_action: false,
      snackbar_action_text: null,
      snackbar_action_timeout: 3000,
      admin_form_valid: false,
      show_password: false,
      password: null,
      rule_password: [
        v => !!v || 'This field is required.'
      ],
      password_alert: false,
      password_alert_success: false
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
  watch: {
    dialog_admin (val) {
      if (!val) {
        this.password = null
        this.password_alert = false
        this.password_alert_success = false
        this.admin_form_valid = false
        this.$refs.admin_auth_form.reset()
      }
    }
  },
  methods: {
    check_admin: function () {
      member_func.verify(this.member.id, this.password).then(success => {
        if (success) {
          this.password_alert = false
          this.password_alert_success = true
        } else {
          this.password_alert = true
        }
      })
    },
    changeMember: function () {
      this.password = null
      this.$refs.admin_auth_form.reset()
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
            punch_card.member.time = punch_card.time
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