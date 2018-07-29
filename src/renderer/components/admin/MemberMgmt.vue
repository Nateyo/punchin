<template>
  <v-layout column>
    <breadcrumbs :crumbs=breadcrumbs></breadcrumbs>
    <v-flex>
      <v-layout row wrap justify-center>
        <div>
          <v-toolbar>
            <v-toolbar-title>Members</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="member_add_dialog" max-width="768px">
              <v-btn slot="activator" color="primary" dark class="mb-2">New Member</v-btn>
              <add-member forceAdmin=false @cancel="member_add_dialog = false" @created="member_created"></add-member>
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
              <td>{{ props.item.is_administrator }}</td>
              <td>{{ props.item.updated_at | formatDatetime }}</td>
              <td class="text-xs-center">
                <v-tooltip bottom>
                  <v-icon
                    slot="activator"
                    class="mr-2"
                    @click="edit_photo_btn(props.item)"
                  >
                    mdi-face
                  </v-icon>
                  <span>
                    Change profile picture.
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-icon
                    slot="activator"
                    color="blue"
                    class="mr-2"
                    @click="edit_profile_btn(props.item)"
                  >
                    mdi-account-edit
                  </v-icon>
                  <span>
                    Edit basic account information.
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-icon
                    slot="activator"
                    color="yellow darken-2"
                    class="mr-2"
                    @click="edit_role_btn(props.item)"
                  >
                    mdi-account-key
                  </v-icon>
                  <span>
                    Edit password and/or role.
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-icon
                    slot="activator"
                    color="red darken-1"
                    class="mr-2"
                    @click="delete_member_btn(props.item)"
                  >
                    mdi-delete
                  </v-icon>
                  <span>
                    Remove member.
                  </span>
                </v-tooltip>
              </td>
            </template>
          </v-data-table>
          <delete-dialog 
            :enabled=delete_member_dialog
            :user=editing_member
            @delete-user="member_delete"
            >
          </delete-dialog>
          <v-dialog v-model="edit_photo_dialog" max-width="1024px">
            <edit-photo @cancel="edit_photo_dialog = false" @updated="edit_photo_updated"></edit-photo>
          </v-dialog>
          <v-dialog v-model="edit_profile_dialog" max-width="768px">
            <edit-profile :member=editing_member @cancel="edit_profile_dialog = false" @updated="edit_profile_updated"></edit-profile>
          </v-dialog>
          <v-dialog v-model="edit_role_dialog" max-width="768px">
            <edit-role :member=editing_member @cancel="edit_role_dialog = false" @updated="edit_role_updated"></edit-role>
          </v-dialog>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumbs from './Breadcrumbs.vue'
import DeleteDialog from './MemberMgmt/DeleteDialog.vue'
import AddMember from '../forms/AddMember.vue'
import EditRole from '../forms/EditRole.vue'
import EditProfile from '../forms/EditProfile.vue'
import EditPhoto from '../forms/EditPhoto.vue'
let member_func = require('../../db/func/members').default

export default {
  name: 'UserManagement',
  components: {AddMember, Breadcrumbs, DeleteDialog, EditRole, EditProfile, EditPhoto},
  mounted () {
    this.update_members()
  },
  data: function () {
    return {
      members: [],
      editing_member: null,
      member_add_dialog: false,
      edit_role_dialog: false,
      edit_profile_dialog: false,
      edit_photo_dialog: false,
      delete_member_dialog: false,
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
          to: '/MemberMgmt',
          text: 'Member Management'
        }
      ],
      headers: [
        { text: 'First Name', value: 'first_name' },
        { text: 'Middle Name', value: 'middle_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Has Password', value: 'has_password' },
        { text: 'Administrator', value: 'is_administrator' },
        { text: 'Last Updated', value: 'updated_at' },
        { text: 'Actions', value: 'id', sortable: false, align: 'center' }
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
    member_created: function (member) {
      this.member_add_dialog = false
      this.update_members()
    },
    edit_photo_updated: function (dataurl) {
      this.edit_photo_dialog = false
      this.editing_member = null
    },
    edit_profile_updated: function (member) {
      this.edit_profile_dialog = false
      this.editing_member = null
    },
    edit_role_updated: function (member) {
      this.edit_role_dialog = false
      this.editing_member = null
      this.update_members()
    },
    member_delete: function (agreed) {
      if (agreed) {
        this.editing_member.destroy()
      }
      this.delete_member_dialog = false
      this.editing_member = null
      this.update_members()
    },
    edit_photo_btn: function (member) {
      this.editing_member = member
      this.edit_photo_dialog = true
    },
    edit_profile_btn: function (member) {
      this.editing_member = member
      this.edit_profile_dialog = true
    },
    edit_role_btn: function (member) {
      this.editing_member = member
      this.edit_role_dialog = true
    },
    delete_member_btn: function (member) {
      this.editing_member = member
      this.delete_member_dialog = true
    }
  }
}
</script>

<style>
</style>