<template>
  <div>
  <v-card class="elevation-12">
    <v-card-title>
      <h2>New {{roles[selected_role].text}}</h2>
    </v-card-title>
    <v-card-text>
      <v-form ref='add_member_form' v-model='valid' lazy-validation>
        <v-text-field
          v-model='first_name'
          label='First Name'
          :rules="rule_required"
          required
        ></v-text-field>
        <v-text-field
          v-model='middle_name'
          label='Middle Name (or initial)'
        ></v-text-field>
        <v-text-field
          v-model='last_name'
          label='Last Name'
          :rules="rule_required"
          required
        ></v-text-field>
        <v-text-field
          v-model='password'
          label='Password'
          :append-icon="show_password ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (show_password = !show_password)"
          :type="show_password ? 'text' : 'password'"
          :rules="rule_password"
          :hint="password_hint"
          min=10
          :required="password_required"
        ></v-text-field>
        <v-text-field
          v-model='password2'
          label='Confirm Password'
          :append-icon="show_password ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (show_password = !show_password)"
          :type="show_password ? 'text' : 'password'"
          :rules="rule_password2"
          :hint="password2_hint"
          min=10
          :required="password_required"
        ></v-text-field>
        <v-select
          :items="roles"
          v-model="selected_role"
          label="Choose Role"
          item-value="value"
          item-text="text"
          :disabled="forceAdmin === 'true'"
          :rules="rule_select_required"
          required
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="submit">Save</v-btn>
      <v-btn color="error" :disabled="forceAdmin === 'true'" @click.native="reset">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
let member_func = require('../../db/func/members').default

export default {
  name: 'AddMember',
  components: {},
  props: ['forceAdmin'],
  created () {
    if (this.forceAdmin === 'true') {
      this.selected_role = 1
    } else {
      this.selected_role = 0
    }
  },
  data () {
    return {
      // Form validation
      valid: true,
      rule_required: [
        v => !!v || 'This field is required.'
      ],
      rule_select_required: [
        v => v !== null || 'Please select a role.'
      ],
      rule_password: [],
      rule_password2: [],
      password_required: false,
      selected_role: null,
      password_hint: '',
      password2_hint: '',
      roles: [
        {text: 'Member', value: 0},
        {text: 'Admin', value: 1}
      ],

      // Form values
      first_name: null,
      middle_name: null,
      last_name: null,
      password: null,
      password2: null,
      picture: null,

      // Form settings
      show_password: false
    }
  },
  watch: {
    selected_role: function (val) {
      let role = this.roles[this.selected_role]
      if (role.value === 1) {
        this.rule_password = [
          v => !!v || 'This field is required.',
          v => (v && v.length >= 10) || 'Password must be greater than 10 characters.',
          v => (v && /^(?=.*[a-z])/.test(v)) || 'Password must contain at least one lower-case character.',
          v => (v && /^(?=.*[A-Z])/.test(v)) || 'Password must contain at least one upper-case character.',
          v => (v && /^(?=.*[0-9])/.test(v)) || 'Password must contain at least one number.'
        ]
        this.password_required = true
        this.password_hint = 'At least 10 characters which must include at least one lower-case, upper-case, and number.'
        this.password2_hint = 'Please confirm your password be re-entering.'
      } else {
        this.rule_password = []
        this.password_required = false
        this.password_hint = 'Password is not required for members, but can be used if desired.'
        this.password2_hint = 'Please confirm your password be re-entering.'
      }
      this.rule_password2 = this.rule_password.slice(0)
      this.rule_password2.push(v => (v === this.password) || 'The given passwords do not match!')
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.add_member_form.validate()) {
        let member = {
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          password: this.password,
          picture: this.picture
        }
        member.is_administrator = this.roles[this.selected_role].value

        member_func.add(member).then(member => {
          this.$refs.add_member_form.reset()
          this.selected_role = 0
          this.$emit('created', member)
        })
          .catch(function (err) {
            this.$refs.add_member_form.reset()
            this.selected_role = 0
            this.$emit('created', err)
          })
      }
    },
    reset: function () {
      this.$refs.add_member_form.reset()
      this.selected_role = 0
      this.$emit('cancel')
    },
    cropping_done: function (blob) {
      this.picture = blob
    }
  }
}
</script>

<style lang='scss'>
</style>