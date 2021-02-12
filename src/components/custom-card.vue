<template>
  <v-card :color="color" dark flat>
    <v-card-title>
      {{ title }}
      <v-icon class="ml-2">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-text class="white--text">
      <h2>Rp. {{ text.toLocaleString("id") }}</h2>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style></style>
