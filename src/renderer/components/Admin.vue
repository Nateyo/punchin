<template>
  <v-content>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.text"
        :disabled="item.disabled"
        :to="item.to"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout row wrap>
      <v-flex md-offset1>
        <v-card>
          <v-card-text>User Management</v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-text>Report Generation</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  name: 'Admin',
  data: function () {
    return {
      items: [
        {
          to: '/Home',
          exact: true,
          text: 'Home',
          disabled: false
        },
        {
          to: '/Admin',
          text: 'Admin'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>