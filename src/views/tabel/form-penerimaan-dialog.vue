<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="title">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.tanggal"
              label="TANGGAL"
              required
              readonly
              @click="dateDialog = true"
            ></v-text-field>
            <v-dialog v-model="dateDialog" persistent width="290px">
              <v-date-picker v-model="date" locale="id">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="closeDateDialog">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="save_and_closeDateDialog">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="PENERIMA"
              v-model="form.penerima"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="DONATUR"
              v-model="form.nama"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="NILAI"
              v-model="form.jumlah"
              required
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="dark" dark small @click="closeDialog">
          CLOSE
        </v-btn>
        <v-btn color="primary" dark small @click="addData" v-if="!isUpdate">
          SAVE
        </v-btn>
        <v-btn color="warning" dark small @click="updateData" v-if="isUpdate">
          UPDATE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "form-dialog",
  props: {
    open: {
      required: true,
      type: Boolean,
    },
    title: {
      required: true,
      type: String,
    },
    isUpdate: {
      required: true,
      type: Boolean,
    },
    dataForUpdate: {
      required: false,
    },
  },
  data() {
    return {
      date: "",
      form: {
        tanggal: "",
        penerima: "",
        nama: "",
        jumlah: "",
      },
      dateDialog: false,
    };
  },
  methods: {
    closeDateDialog() {
      this.date = "";
      this.dateDialog = false;
    },

    save_and_closeDateDialog() {
      const tanggal = this.date.split("-");
      this.form.tanggal = `${tanggal[2]}-${tanggal[1]}-${tanggal[0]}`;
      this.closeDateDialog();
    },

    closeDialog(message = null) {
      this.form = {
        tanggal: "",
        penerima: "",
        nama: "",
        jumlah: "",
      };

      if (!message) {
        this.$emit("close-form");
      } else {
        this.$emit("close-form-open-snackbar", message);
      }
    },

    addData() {
      try {
        const tabel = "penerimaan";
        const data = { ...this.form };
        data.id = Date.now();
        data.jumlah = parseInt(data.jumlah);

        this.$store.dispatch("addData", { tabel, data });
        this.closeDialog("satu data telah di tambahkan");
      } catch (error) {
        console.log(error);
      }
    },

    updateData() {
      try {
        const id = this.dataForUpdate.id;
        const tabel = "penerimaan";
        const data = this.form;
        data.jumlah = parseInt(data.jumlah);

        this.$store.dispatch("updateData", { id, tabel, data });
        this.closeDialog("satu data telah di update");
      } catch (error) {
        alert(error);
      }
    },
  },
  watch: {
    dataForUpdate(newvalue) {
      console.log("form penerimaan dialog");
      console.log(newvalue);
      if (newvalue) {
        this.form = { ...newvalue };
      } else {
        this.form = {
          tanggal: "",
          penerima: "",
          nama: "",
          jumlah: "",
        };
      }
    },
  },
};
</script>

<style></style>
