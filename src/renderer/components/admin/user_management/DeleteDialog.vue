<template>
  <v-dialog
    v-model="enabled"
    max-width="480px"
    max-height="720px"
  >
    <v-card>
      <v-card-title class="headline">Confirm Delete User</v-card-title>
      <v-card-text>
        Are you sure you wish to delete the following user:
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
  }
}
</script>

<style lang="scss">
</style>