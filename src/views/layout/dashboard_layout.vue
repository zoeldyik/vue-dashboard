<template>
  <div class="dashboard-layout">
    <navbar @toggle-sidebar="toggleSidebar" />
    <sidebar
      :sidebarMenu="display_sidebar"
      :isPermanent="isPermanent"
      @close="toggleSidebar"
    />

    <router-view></router-view>
  </div>
</template>

<script>
import navbar from "../../components/navbar.vue";
import sidebar from "../../components/sidebar.vue";

export default {
  components: {
    navbar,
    sidebar,
  },
  data(vm) {
    return {
      display_sidebar: vm.$vuetify.breakpoint.smAndUp,
      isPermanent: vm.$vuetify.breakpoint.smAndUp,
    };
  },
  methods: {
    toggleSidebar() {
      this.display_sidebar = !this.display_sidebar;
      this.isPermanent = !this.isPermanent;
    },
  },
};
</script>
