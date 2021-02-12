<template>
  <div class="delete-dialog">
    <v-dialog v-model="open" max-width="300px">
      <v-card max-width="300px" class="flex align-center justify-center column">
        <v-card-title class="text-center font-weight-regular subtitle-1">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" small dark @click="closeDelete">CANCEL</v-btn>
          <v-btn color="dark" small dark @click="deleteConfirm">
            DELETE
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    closeDelete() {
      this.$emit("cancel-delete");
    },
    deleteConfirm() {
      this.$emit("confirm-delete", "satu data di hapus!");
    },
  },
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__title {
  word-break: normal;
}
</style>
