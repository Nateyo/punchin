<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Signed In</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(member, index) in members">
        <v-list-tile :key="index" avatar>
          <v-list-tile-avatar>
            <img v-if="member.portrait" :src="member.portrait">
            <img v-else src='static/portrait.png'>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{member.first_name}} {{member.middle_name}} {{member.last_name}}</v-list-tile-title>
            <v-list-tile-sub-title v-html="member.signed_in"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'SignedInList',
  props: ['members'],
  data: function () {
    return {
    }
  }
}
</script>

<style lang='scss'>
</style>