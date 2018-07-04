<template>
  <v-layout column>
    <breadcrumbs :crumbs=breadcrumbs></breadcrumbs>
    <v-flex>
      <v-layout row wrap justify-center>
        <v-flex xs6>
          <v-card>
            <v-card-title>Reports</v-card-title>
            <v-card-text>
              <p>
                <v-date-picker v-model="month_picker" :landscape="true" type="month"></v-date-picker>
              </p>
              <span v-if="!month_picker">
                Please select a month to continue.
              </span>
              <span v-else>
                <v-select
                  v-if="month_picker"
                  v-model="report_selected"
                  label="Please select a report to run."
                  :items=reports >
                </v-select>
                <v-btn @click.native="run_analysis">Get Report</v-btn>
              </span>
            </v-card-text>
          </v-card>
          <v-dialog v-model="report_dialog" max-width="768px">
            <v-card>
              <v-card-title>
                <span class="headline">Monthly Attendance</span>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  hide-actions
                  class="elevation-4"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.first_name }}</td>
                    <td>{{ props.item.middle_name }}</td>
                    <td>{{ props.item.last_name }}</td>
                    <td>{{ props.item.attendance }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="report_dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumbs from './Breadcrumbs.vue'
import moment from 'moment'
let punch_func = require('../../db/func/punch_cards').default
let member_func = require('../../db/func/members').default

export default {
  name: 'Reports',
  components: {Breadcrumbs},
  data: function () {
    return {
      month_picker: null,
      report_selected: null,
      report_dialog: false,
      reports: [
        { text: 'Average daily attendance', value: 0 },
        { text: 'Number of days attended', value: 1 }
      ],
      items: [],
      headers: [
        { text: 'Member ID', value: 'id' },
        { text: 'First Name', value: 'first_name' },
        { text: 'Middle Name', value: 'middle_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Days Attended', value: 'attendance' }
      ],
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
          to: '/Reports',
          text: 'Reports'
        }
      ]
    }
  },
  methods: {
    run_analysis: function () {
      if (this.report_selected === 1) {
        let monthly_member_set = new Set()
        let daily_member_set = {}
        punch_func.fetchByMonth(this.month_picker).then(cards => {
          cards.forEach(card => {
            let day = moment(card.time).date()
            if (daily_member_set[day] === undefined) {
              daily_member_set[day] = new Set()
            }
            daily_member_set[day].add(card.member_id)
            monthly_member_set.add(card.member_id)
          })
          // Loop through all users who appeared during the month and count how many days they attended
          let num_days_attended = {}
          monthly_member_set.forEach(member_id => {
            if (num_days_attended[member_id] === undefined) {
              num_days_attended[member_id] = 0
            }

            for (let day in daily_member_set) {
              let day_set = daily_member_set[day]
              if (day_set.has(member_id)) {
                num_days_attended[member_id]++
              }
            }
          })
          member_func.fetchSome(Array.from(monthly_member_set), true).then(members => {
            members.forEach(member => {
              member.attendance = num_days_attended[member.id]
            })
            this.items = members
            this.report_dialog = true
          })
        })
      } else {
        let daily_member_set = {}
        punch_func.fetchByMonth(this.month_picker).then(cards => {
          cards.forEach(card => {
            let day = moment(card.time).date()
            if (daily_member_set[day] === undefined) {
              daily_member_set[day] = new Set()
            }
            daily_member_set[day].add(card.member_id)
          })

          let day_of_week_counts = [0, 0, 0, 0, 0, 0, 0]

          let day = moment(this.month_picker).startOf('month')
          let total_days = day.daysInMonth()
          for (let x = 0; x < total_days; x++) {
            let day_of_week = day.day()
            day_of_week_counts[day_of_week]++
            day.add(1, 'day')
          }

          let day_of_week_members = [0, 0, 0, 0, 0, 0, 0]

          for (let day in daily_member_set) {
            let day_of_week = moment(`${this.month_picker}-${day}`).day()
            day_of_week_members[day_of_week]++
          }

          console.log(day_of_week_members)
        })
      }
    }
  },
  watch: {
    month_picker: function (val) {
    }
  }
}
</script>

<style>
</style>