<template>
  <v-layout column>
    <breadcrumbs :crumbs=breadcrumbs></breadcrumbs>
    <v-flex>
      <v-layout row wrap justify-center>
        <div>
          <v-toolbar>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="add_dialog" max-width="768px">
              <v-btn slot="activator" color="primary" dark class="mb-2">New Member</v-btn>
              <add-member forceAdmin=false @cancel="add_canceled" @memberAdded="member_added"></add-member>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="members"
            class="elevation-4"
          >
            <template @click.native="test" slot="items" slot-scope="props">
              <td>{{ props.item.first_name }}</td>
              <td>{{ props.item.middle_name }}</td>
              <td>{{ props.item.last_name }}</td>
              <td>{{ props.item.has_password }}</td>
              <td>{{ props.item.updated_at | formatDatetime }}</td>
            </template>
          </v-data-table>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumbs from './admin/Breadcrumbs.vue'
import AddMember from './forms/AddMember.vue'
let member_func = require('../db/func/members').default

export default {
  name: 'UserManagement',
  components: {AddMember, Breadcrumbs},
  beforeCreate () {
    member_func.fetchAll(true).then(members => {
      members.forEach(member => {
        if (member.password === 'hidden') {
          member.has_password = 'Yes'
        } else {
          member.has_password = 'No'
        }
      })
      this.members = members
    })
  },
  data: function () {
    return {
      search: '',
      add_dialog: false,
      members: [],
      breadcrumbs: [
        {
          to: '/Home',
          text: 'Home'
        },
        {
          to: '/Admin',
          text: 'Admin'
        },
        {
          to: '/UserManagement',
          text: 'User Management'
        }
      ],
      headers: [
        { text: 'First Name', value: 'first_name' },
        { text: 'Middle Name', value: 'middle_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Has Password', value: 'has_password' },
        { text: 'Last Updated', value: 'updated_at' }
      ]
    }
  },
  methods: {
    member_added: function (member) {
      this.add_dialog = false
      if (member.password !== null) {
        member.has_password = 'Yes'
      } else {
        member.has_password = 'No'
      }
      this.members.push(member)
    },
    add_canceled: function () {
      this.add_dialog = false
    }
  }
}
</script>

<style>
</style>