<template>
  <div class="wrap">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn color="warning" small depressed @click="logout">
        LOGOUT
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    logout() {
      this.$store.commit("set_isLogin", false);
      this.$router.replace("/login");
    },
  },
};
</script>
