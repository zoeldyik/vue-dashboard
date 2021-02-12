<template>
  <div class="my-chart">
    <canvas
      class="chart"
      height="250"
      ref="chart"
      style="text-color:white;"
    ></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    dataLabel: {
      type: String,
    },
    Ylabel: {
      type: Array,
    },
    Xdata: {
      type: Array,
    },
    borderColor: {
      type: String,
    },
  },
  methods: {
    display() {
      const ctx = this.$refs.chart;

      let data = {
        labels: this.Ylabel,
        datasets: [
          {
            label: this.dataLabel,
            data: this.Xdata,
            borderColor: this.borderColor,
            borderWidth: 2,
            backgroundColor: "white",
            fill: false,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                // display: false,
                color: "rgba(66, 66, 66, .2)",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                // display: false,
                color: "rgba(66, 66, 66, .2)",
              },
            },
          ],
        },
      };

      Chart.defaults.global.defaultFontColor = "#f5f5f5";
      new Chart(ctx, {
        type: "line",
        data,
        options,
      });
    },
  },
  mounted() {
    this.display();
  },
};
</script>

<style>
.container {
  color: rgb(66, 66, 66);
}
</style>
