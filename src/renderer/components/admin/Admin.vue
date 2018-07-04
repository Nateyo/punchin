<template>
  <v-layout column>
    <breadcrumbs :crumbs=breadcrumbs></breadcrumbs>
    <v-flex> <!--buttons -->
      <v-layout row wrap justify-center>
        <v-flex xs4>
          <v-card @click.native="nav_membermgmt" color="primary" ripple height="150px">
            <v-card-text>
              <h2>
                Member Management
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs1>
        </v-flex>
        <v-flex xs4>
          <v-card @click.native="nav_reports" color="primary" ripple height="150px">
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
    nav_membermgmt: function () {
      this.$router.push('/MemberMgmt')
    },
    nav_reports: function () {
      this.$router.push('/Reports')
    }
  }
}
</script>

<style lang="scss">
</style>