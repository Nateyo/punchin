<template>
  <v-layout column>
    <breadcrumbs :crumbs=breadcrumbs></breadcrumbs>
    <v-flex> <!--buttons -->
      <v-layout row wrap>
        <v-flex xs6>
          <v-card @click.native="user_management" color="red" ripple height="150px">
            <v-card-text>
              <h2>
                User Management
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card @click.native="reports" color="green" ripple height="150px">
            <v-card-text>
              <h2>
                Reports
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumbs from './Breadcrumbs.vue'

export default {
  name: 'Admin',
  components: {Breadcrumbs},
  data: function () {
    return {
      breadcrumbs: [
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
  },
  methods: {
    user_management: function () {
      this.$router.push('/UserManagement')
    },
    reports: function () {
      this.$router.push('/Reports')
    }
  }
}
</script>

<style lang="scss">
</style>