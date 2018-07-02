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
            <template slot="items" slot-scope="props">
              <td>{{ props.item.first_name }}</td>
              <td>{{ props.item.middle_name }}</td>
              <td>{{ props.item.last_name }}</td>
              <td>{{ props.item.has_password }}</td>
              <td>{{ props.item.updated_at | formatDatetime }}</td>
              <td class="text-xs-center">
                <v-btn @click.native="edit_user_btn(props.item)" color="primary" small><v-icon>mdi-account-edit</v-icon></v-btn>
              </td>
              <td class="text-xs-center">
                <v-btn @click.native="delete_user_btn(props.item)" color="error" small><v-icon>mdi-delete</v-icon></v-btn>
              </td>
            </template>
          </v-data-table>
          <delete-dialog 
            :enabled=delete_dialog
            :user=current_user
            @delete-user="delete_user"
            >
          </delete-dialog>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumbs from './Breadcrumbs.vue'
import DeleteDialog from './user_management/DeleteDialog.vue'
import AddMember from '../forms/AddMember.vue'
let member_func = require('../../db/func/members').default

export default {
  name: 'UserManagement',
  components: {AddMember, Breadcrumbs, DeleteDialog},
  mounted () {
    this.update_members()
  },
  data: function () {
    return {
      search: '',
      add_dialog: false,
      members: [],
      current_user: null,
      delete_dialog: false,
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
        { text: 'Last Updated', value: 'updated_at' },
        { text: 'Edit', value: 'id', sortable: false, align: 'center' },
        { text: 'Remove', value: 'id', sortable: false, align: 'center' }
      ]
    }
  },
  methods: {
    update_members: function (member) {
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
    },
    edit_user_btn: function (user) {
      console.log(user)
    },
    delete_user_btn: function (user) {
      this.current_user = user
      this.delete_dialog = true
    },
    delete_user: function (agreed) {
      if (agreed) {
        this.current_user.destroy()
      }
      this.delete_dialog = false
      this.current_user = null
      this.update_members()
    }
  }
}
</script>

<style>
</style>