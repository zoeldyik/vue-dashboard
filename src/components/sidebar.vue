<template>
  <v-navigation-drawer v-model="sidebarMenu" app :permanent="sidebarMenu">
    <v-list dense>
      <v-list-item link to="/">ADMIN PANEL</v-list-item>
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
  props: ["sidebarMenu"],
  data() {
    return {
      items: [
        ["mdi-monitor-dashboard", "DASHBOARD", "/"],
        ["mdi-chart-box-plus-outline", "TABEL", "/tabel"],
      ],
    };
  },
  methods: {
    close() {
      this.$emit("toggle-sidebar");
    },
  },
};
</script>
