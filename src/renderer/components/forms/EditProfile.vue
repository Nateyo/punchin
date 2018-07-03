<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref='edit_profile_form' v-model='valid' lazy-validation>
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
  name: 'EditProfile',
  props: ['member'],
  data () {
    return {
      // Form validation
      valid: true,
      rule_required: [
        v => !!v || 'This field is required.'
      ],

      // Form values
      first_name: null,
      middle_name: null,
      last_name: null
    }
  },
  watch: {
    member: function (m) {
      if (m !== null) {
        this.first_name = m.first_name
        this.middle_name = m.middle_name
        this.last_name = m.last_name
      }
    }
  },
  methods: {
    save: function () {
      if (this.$refs.edit_profile_form.validate()) {
        this.member.first_name = this.first_name
        this.member.middle_name = this.middle_name
        this.member.last_name = this.last_name
        member_func.update(this.member).then(member => {
          this.$refs.edit_profile_form.reset()
          this.selected_role = 0
          this.$emit('updated', member)
        })
          .catch(function (err) {
            this.$refs.edit_profile_form.reset()
            this.selected_role = 0
            this.$emit('updated', err)
          })
      }
    },
    cancel: function () {
      this.$refs.edit_profile_form.reset()
      this.selected_role = 0
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='scss'>
</style>