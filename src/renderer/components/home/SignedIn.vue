<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Signed In</v-toolbar-title>
    </v-toolbar>
    <v-list two-line dense>
      <template v-for="(member, index) in members">
        <v-list-tile :key="index" avatar>
          <v-list-tile-avatar>
            <img v-if="member.picture" :src="member.picture">
            <img v-else src='static/portrait.png'>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{member.first_name}} {{member.middle_name}} {{member.last_name}}</v-list-tile-title>
            <v-list-tile-sub-title v-html="member.signed_in"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{member.time | formatDate}}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="`divider-${index}`"></v-divider>
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