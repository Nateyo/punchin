<template>
  <v-card>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-title>Signed In</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(member, index) in members">
        <v-list-tile :key="index" avatar>
          <v-list-tile-avatar>
            <img :src="member.portrait">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{member.first_name}} {{member.last_name}}</v-list-tile-title>
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