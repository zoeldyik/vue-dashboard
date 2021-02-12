<template>
  <v-main class="dashboard">
    <v-container fluid class="pt-6 dashboard">
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="({ title, text, icon, color }, idx) in display_items"
          :key="idx"
        >
          <custom-card
            :title="title"
            :text="text"
            :icon="icon"
            :color="color"
          ></custom-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(chart, idx) in chartData"
          :key="chart.dataLabel"
        >
          <v-card elevation="0" :color="idx ? 'warning' : 'success'">
            <v-card-title class="white--text">
              {{ chart.dataLabel }}
            </v-card-title>
            <v-card-text>
              <custom-chart
                :dataLabel="chart.dataLabel"
                :Xdata="chart.Xdata"
                :Ylabel="chart.Ylabel"
                :borderColor="chart.borderColor"
              ></custom-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import customCard from "../../components/custom-card";
import chart from "../../components/chart";

export default {
  components: {
    "custom-card": customCard,
    "custom-chart": chart,
  },
  data() {
    return {
      items: [
        {
          title: "TARGET",
          icon: "mdi-target",
          text: 0,
          color: "primary",
        },
        {
          title: "PEMASUKAN",
          icon: "mdi-chart-box-plus-outline",
          text: 0,
          color: "success",
        },
        {
          title: "PENGELUARAN",
          icon: "mdi-cart-minus",
          text: 0,
          color: "warning",
        },
      ],
      chartData2: [
        {
          Ylabel: [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
            "indigo",
            "maroon",
          ],
          Xdata: [12, 19, 3, 5, 2, 3, 6, 5],
          dataLabel: "PENDAPATAN",
          borderColor: "#388E3C",
        },
        {
          Ylabel: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          Xdata: [11, 29, 6, 5, 6, 8],
          dataLabel: "PENGELUARAN",
          borderColor: "#FB8C00",
        },
      ],
    };
  },
  computed: {
    display_items() {
      const datas = this.$store.getters.get_all;

      return this.items.map((item, index) => {
        const { title, icon, color } = item;
        return {
          title,
          icon,
          color,
          text: datas[index],
        };
      });
    },
    data_penerimaan() {
      return this.$store.state.tabel_penerimaan;
    },
    data_pengeluaran() {
      return this.$store.state.tabel_pengeluaran;
    },
    chartData() {
      let pemasukan = this.data_penerimaan.slice(-6);
      let pengeluaran = this.data_pengeluaran.slice(-6);

      let data_pemasukan = {
        dataLabel: "PEMASUKAN",
        borderColor: "#388E3C",
        Ylabel: [],
        Xdata: [],
      };

      let data_pengeluaran = {
        dataLabel: "PENGELUARAN",
        borderColor: "#EF6C00",
        Ylabel: [],
        Xdata: [],
      };

      data_pemasukan.Ylabel = pemasukan.map((row) => row.tanggal);
      data_pemasukan.Xdata = pemasukan.map((row) => row.jumlah);

      data_pengeluaran.Ylabel = pengeluaran.map((row) => row.tanggal);
      data_pengeluaran.Xdata = pengeluaran.map((row) => row.jumlah);

      return [data_pemasukan, data_pengeluaran];
    },
  },
};
</script>

<style></style>
