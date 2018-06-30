<template>
  <v-flex>
    <v-card color="secondary">
      <v-card-text>
        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item
            v-for="item in crumbs"
            :key="item.text"
            :disabled="item.disabled"
            :to="item.to"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: ['crumbs']
}
</script>

<style>
</style>