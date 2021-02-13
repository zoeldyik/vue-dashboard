<template>
  <v-navigation-drawer
    v-model="sidebarMenu"
    app
    :temporary="isTemporary"
    :permanent="isPermanent"
  >
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">ADMIN PANEL</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon class="d-md-none">
          <v-icon @click="close">mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <!-- <v-list-item dense @click="close" class="primary" dark>
        <v-list-item-content>
          <v-list-item-title>CLOSE SIDEBAR</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item> -->
    </v-list>
    <v-list dense class="pt-2">
      <v-list-item
        v-for="([icon, text, path], i) in items"
        :key="i"
        link
        :to="path"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["sidebarMenu", "isPermanent"],
  data(vm) {
    return {
      isTemporary: vm.$vuetify.breakpoint.smAndDown,
      items: [
        ["mdi-monitor-dashboard", "DASHBOARD", "/"],
        ["mdi-chart-box-plus-outline", "TABEL", "/tabel"],
      ],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
