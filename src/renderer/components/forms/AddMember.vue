<template>
  <v-container class='elevation-5'>
    <v-form ref='add_user_form' v-model='valid' lazy-validation>
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
        hint='At least 10 characters which must include at least one lower-case, upper-case, and number.'
        min=10
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        @click="submit"
      >submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'AddMember',
  components: {},
  data () {
    return {
      // Form validation
      valid: true,
      rule_required: [
        v => !!v || 'This field is required.'
      ],
      rule_password: [
        v => !!v || 'This field is required.',
        v => (v && v.length >= 10) || 'Password must be greater than 10 characters.',
        v => (v && /^(?=.*[a-z])/.test(v)) || 'Password must contain at least one lower-case character.',
        v => (v && /^(?=.*[A-Z])/.test(v)) || 'Password must contain at least one upper-case character.',
        v => (v && /^(?=.*[0-9])/.test(v)) || 'Password must contain at least one number.'
      ],

      // Form values
      first_name: null,
      middle_name: null,
      last_name: null,
      password: null,

      // Form settings
      show_password: false
    }
  },
  methods: {
    submit () {
      if (this.$refs.add_user_form.validate()) {
        var member = {
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          password: this.password,
          is_administrator: true
        }
      }
    }
  }
}
</script>

<style lang='scss'>
</style>