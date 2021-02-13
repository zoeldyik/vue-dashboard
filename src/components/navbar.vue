<template>
  <div class="wrap">
    <v-app-bar app flat color="white">
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn small depressed color="warning" @click="logout">
        LOGOUT
        <v-icon x-small>
          mdi-logout
        </v-icon>
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
