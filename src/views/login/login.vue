<template>
  <v-main>
    <div class="login">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="mx-auto mt-10 ">
            <v-card elevation="0">
              <v-card-title class="primary--text">
                <h3>LOGIN</h3>
              </v-card-title>

              <v-card-text>
                <!-- alert -->
                <v-alert
                  :value="alert.open"
                  :type="alert.type"
                  dark
                  transition="scale-transition"
                >
                  {{ alert.text }}
                </v-alert>

                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  label="Password"
                  required
                ></v-text-field>
              </v-card-text>

              <v-card-text>
                <v-btn
                  color="primary"
                  block
                  depressed
                  class="mb-2"
                  @click="login"
                >
                  LOGIN
                </v-btn>
                <v-btn color="secondary" block depressed>FORGET PASSWORD</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-main>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      username: "admin",
      password: "admin",
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      alert: {
        open: false,
        text: "username / password salah!",
        type: "error",
      },
    };
  },
  methods: {
    login() {
      const username = "admin";
      const password = "admin";
      if (this.username !== username || this.password !== password) {
        this.alert.open = true;
      } else {
        this.$store.commit("set_isLogin", true);
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style></style>
