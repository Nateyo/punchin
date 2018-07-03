<template>
  <v-dialog
    v-model="enabled"
    max-width="480px"
    max-height="720px"
  >
    <v-card>
      <v-card-title class="headline">Confirm Delete User</v-card-title>
      <v-card-text>
        Are you sure you wish to remove the following member? <strong>Warning, this can not be reversed.</strong>
        <p class="text-xs-center">
          <br>
          <strong>{{user_confirm}}</strong>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-2"
          flat
          @click="agree"
        >
          Yes
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          flat
          @click="disagree"
        >
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: ['enabled', 'user'],
  data: function () {
    return {
    }
  },
  methods: {
    agree: function () {
      this.$emit('delete-user', true)
    },
    disagree: function () {
      this.$emit('delete-user', false)
    }
  },
  computed: {
    user_confirm: function () {
      let user_str = ''

      if (this.user !== null) {
        user_str = `${this.user.last_name}, ${this.user.first_name} ${this.user.middle_name}`
      }

      return user_str
    }
  }
}
</script>

<style lang="scss">
</style>