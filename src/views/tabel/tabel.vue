<template>
  <v-main>
    <v-container fluid>
      <!-- pendapatan -->
      <v-card elevation="1">
        <v-card-title>
          <!-- show in small screen -->
          <v-toolbar flat class="hidden-md-and-up">
            <v-spacer></v-spacer>
            <h3 class="primary--text mr-3">PENDAPATAN</h3>
            <!-- add data btn -->
            <v-btn
              small
              depressed
              color="primary"
              @click="create_item_penerimaan('ADD DATA PENERIMAAN')"
            >
              <v-icon small>mdi-plus</v-icon>
              data
            </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-toolbar flat>
            <h3 class="primary--text mr-3 hidden-sm-and-down">PENDAPATAN</h3>

            <!-- add data btn -->
            <v-btn
              small
              depressed
              color="primary"
              class="hidden-sm-and-down"
              expanded
              @click="create_item_penerimaan('ADD DATA PENERIMAAN')"
            >
              <v-icon small>mdi-plus</v-icon>
              data
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <!-- search input -->
            <v-text-field
              v-model="tbl_penerimaan.search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </v-card-title>

        <v-data-table
          :headers="headers_tabel_penerimaan"
          :items="items_tabel_penerimaan"
          :items-per-page="5"
          :search="tbl_penerimaan.search"
          class="text-uppercase"
        >
          <template v-slot:item.jumlah="{ item }">
            {{ item.jumlah.toLocaleString("id") }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              color="primary"
              @click="edit_item_penerimaan('EDIT DATA PENERIMAAN', item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="warning"
              @click="deleteItem({ id: item.id, tabel: 'penerimaan' })"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!-- end table pendapatan -->

      <!-- table PENGELUARAN -->
      <v-card class="mt-6" elevation="1">
        <v-card-title>
          <!-- show in small screen -->
          <v-toolbar flat class="hidden-md-and-up">
            <v-spacer></v-spacer>
            <h3 class="secondary--text mr-2">PENGELUARAN</h3>
            <!-- add data btn -->
            <v-btn
              small
              depressed
              color="secondary"
              @click="create_item_pengeluaran('ADD DATA PENGELUARAN')"
            >
              <v-icon small>mdi-plus</v-icon>
              data
            </v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- end show in small screen -->

          <v-toolbar flat>
            <h3 class="secondary--text mr-2 hidden-sm-and-down">PENGELUARAN</h3>
            <!-- add data btn -->
            <v-btn
              small
              depressed
              color="secondary"
              class="hidden-sm-and-down"
              @click="create_item_pengeluaran('ADD DATA PENGELUARAN')"
            >
              <v-icon small>mdi-plus</v-icon>
              data
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <!-- search input -->
            <v-text-field
              v-model="tbl_pengeluaran.search"
              append-icon="mdi-magnify"
              color="secondary"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </v-card-title>

        <v-data-table
          :headers="headers_tabel_pengeluaran"
          :items="items_tabel_pengeluaran"
          :search="tbl_pengeluaran.search"
          :items-per-page="5"
          class="text-uppercase"
        >
          <template v-slot:item.jumlah="{ item }">
            {{ item.jumlah.toLocaleString("id") }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              color="primary"
              @click="edit_item_pengeluaran('EDIT DATA PENGELUARAN', item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="warning"
              @click="deleteItem({ id: item.id, tabel: 'pengeluaran' })"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!-- END table PENGELUARAN -->
    </v-container>

    <!-- form penerimaan dialog -->
    <form-penerimaan-dialog
      :isUpdate="isUpdate"
      :dataForUpdate="dataForUpdate"
      :open="isOpen_form_penerimaan"
      :title="dialogTitle"
      @close-form="close_form_penerimaan"
      @close-form-open-snackbar="close_form_penerimaan($event)"
    />

    <!-- form pengeluaran dialog -->
    <form-pengeluaran-dialog
      :isUpdate="isUpdate"
      :dataForUpdate="dataForUpdate"
      :open="isOpen_form_pengeluaran"
      :title="dialogTitle"
      @close-form="close_form_pengeluaran"
      @close-form-open-snackbar="close_form_pengeluaran($event)"
    />

    <delete-dialog
      :open="openDeleteDialog"
      @cancel-delete="close_del_dialog"
      @confirm-delete="confirm_delete($event)"
    />

    <!-- snackbar -->
    <v-snackbar
      app
      top
      right
      color="primary"
      v-model="snackbar.isOpen"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="dark"
          text
          v-bind="attrs"
          @click="snackbar.isOpen = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- snackbar -->
  </v-main>
</template>

<script>
import form_penerimaan_dialog from "./form-penerimaan-dialog";
import form_pengeluaran_dialog from "./form-pengeluaran-dialog";
import delete_dialog from "./delete-dialog";

export default {
  components: {
    "form-penerimaan-dialog": form_penerimaan_dialog,
    "form-pengeluaran-dialog": form_pengeluaran_dialog,
    "delete-dialog": delete_dialog,
  },
  data() {
    return {
      tbl_penerimaan: {
        search: "",
      },
      tbl_pengeluaran: {
        search: "",
      },
      isUpdate: false,
      dataForUpdate: null, //form penerimaan dan pengeluaran menggunakan dataForUpdate sbg propnya
      openDeleteDialog: false,
      dialogTitle: "",
      isOpen_form_penerimaan: false,
      isOpen_form_pengeluaran: false,
      delete_dialog: {
        id: null,
        tabel: null,
      },
      snackbar: {
        text: "lorem ipusm text",
        isOpen: false,
        timeOut: 1500,
      },
    };
  },
  computed: {
    headers_tabel_penerimaan() {
      return this.$store.state.headers_tbl_penerimaan;
    },
    headers_tabel_pengeluaran() {
      return this.$store.state.headers_tbl_pengeluaran;
    },
    items_tabel_penerimaan() {
      return this.$store.state.tabel_penerimaan;
    },
    items_tabel_pengeluaran() {
      return this.$store.state.tabel_pengeluaran;
    },
  },
  methods: {
    open_form_penerimaan() {
      this.isOpen_form_penerimaan = true;
    },
    close_form_penerimaan(text) {
      this.isOpen_form_penerimaan = false;
      this.dataForUpdate = null;
      this.isUpdate = false;

      if (text.length) {
        this.open_snackbar(text);
      }
    },
    edit_item_penerimaan(title, item) {
      this.isUpdate = true;
      this.dialogTitle = title;
      this.dataForUpdate = { ...item };
      this.open_form_penerimaan();
      console.log(item);
    },
    create_item_penerimaan(title) {
      this.dialogTitle = title;
      this.open_form_penerimaan();
    },

    // modular
    deleteItem(data) {
      const { id, tabel } = data;
      this.delete_dialog.id = id;
      this.delete_dialog.tabel = tabel;
      this.openDeleteDialog = true;
    },
    close_del_dialog() {
      this.openDeleteDialog = false;
    },
    confirm_delete(text) {
      this.close_del_dialog();
      this.$store.commit("deleteData", this.delete_dialog);
      this.delete_dialog.id = null;
      this.delete_dialog.tabel = null;
      console.log("delete success");

      this.open_snackbar(text);
    },
    open_snackbar(text) {
      this.snackbar.text = text;
      this.snackbar.timeOut = 1500;
      this.snackbar.isOpen = true;
    },

    // pengeluaran
    open_form_pengeluaran() {
      this.isOpen_form_pengeluaran = true;
    },
    close_form_pengeluaran(text) {
      this.isOpen_form_pengeluaran = false;
      this.isUpdate = false;
      this.dataForUpdate = null;

      if (text.length) {
        this.open_snackbar(text);
      }
    },
    create_item_pengeluaran() {
      this.open_form_pengeluaran();
    },
    edit_item_pengeluaran(title, item) {
      this.isUpdate = true;
      this.dialogTitle = title;
      this.dataForUpdate = { ...item };
      this.open_form_pengeluaran();
      console.log(item);
    },
  },
};
</script>
