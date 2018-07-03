<template>
  <v-card class="elevation-12">
    <v-card-title>
      Edit Role
    </v-card-title>
    <v-card-text>
      <v-form ref='edit_role_form' v-model='valid' lazy-validation>
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
          :rules="rule_select_required"
          required
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="save">Save</v-btn>
      <v-btn color="error" @click.native="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
let member_func = require('../../db/func/members').default

export default {
  name: 'EditRole',
  components: {},
  props: ['member'],
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
      password: null,
      password2: null,

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
    },
    member: function (m) {
      if (m !== null) {
        if (m.is_administrator) {
          this.selected_role = 1
        } else {
          this.selected_role = 0
        }
      }
    }
  },
  methods: {
    save: function () {
      if (this.$refs.edit_role_form.validate()) {
        this.member.is_administrator = this.selected_role
        this.member.password = this.password
        member_func.update(this.member).then(member => {
          this.$refs.edit_role_form.reset()
          this.selected_role = 0
          this.$emit('updated', member)
        })
          .catch(function (err) {
            this.$refs.edit_role_form.reset()
            this.selected_role = 0
            this.$emit('updated', err)
          })
      }
    },
    cancel: function () {
      this.$refs.edit_role_form.reset()
      this.selected_role = 0
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='scss'>
</style>