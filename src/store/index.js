import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    target:1000000,
    headers_tbl_penerimaan: [
      {
        text: "TANGGAL",
        align: "start",
        value: "tanggal",
      },
      { text: "NAMA", value: "nama" },
      { text: "JUMLAH", value: "jumlah" },
      { text: "PENERIMA", value: "penerima" },
      { text: "ACTIONS", sortable: false, value: "actions" },
    ],
    headers_tbl_pengeluaran: [
      {
        text: "TANGGAL",
        align: "start",
        value: "tanggal",
      },
      { text: "NAMA", value: "nama" },
      { text: "JUMLAH", value: "jumlah" },
      { text: "ACTIONS", sortable: false, value: "actions" },
    ],
    tabel_penerimaan: [
      {
        id:1,
        tanggal: "01-12-20",
        nama: "JAINUDIN",
        jumlah: 100000,
        penerima: "ADI",
      },
      {
        id:2,
        tanggal: "01-12-20",
        nama: "ZAKARIA",
        jumlah: 150000,
        penerima: "BUDI",
      },
      {
        id:3,
        tanggal: "11-02-21",
        nama: "HAMBA ALLAH",
        jumlah: 100000,
        penerima: "DEDI",
      },
      {
        id:4,
        tanggal: "12-02-21",
        nama: "JAMIL",
        jumlah: 300000,
        penerima: "DODI",
      },
      {
        id:5,
        tanggal: "15-02-21",
        nama: "IMAN",
        jumlah: 50000,
        penerima: "ADI",
      },
      {
        id:6,
        tanggal: "21-02-21",
        nama: "JAINUDIN",
        jumlah: 250000,
        penerima: "DEDI",
      },
    ],
    tabel_pengeluaran:[
      {
        id:1,
        tanggal: "01-01-2021",
        nama: "bayar listrik",
        jumlah: 240000,
      },
      {
        id:2,
        tanggal: "01-01-2021",
        nama: "bayar marbot",
        jumlah: 500000,
      },
      {
        id:3,
        tanggal: "01-01-2021",
        nama: "bayar PDAM",
        jumlah: 100000,
      },
      {
        id:4,
        tanggal: "12-01-2021",
        nama: "semen 5 karung",
        jumlah: 300000,
      },
      {
        id:5,
        tanggal: "12-01-2021",
        nama: "pasir 1 dam",
        jumlah: 35000,
      },
      {
        id:6,
        tanggal: "01-02-2021",
        nama: "bayar listrik",
        jumlah: 250000,
      },
    ],
  },
  getters:{
    get_all(state){
      const target = state.target; 
      const pendapatan = state.tabel_penerimaan.reduce((a,b)=> a + b.jumlah,0)
      const pengeluaran = state.tabel_pengeluaran.reduce((a,b)=> a + b.jumlah,0)

      return [target, pendapatan, pengeluaran];
    },
  },
  mutations:{
    set_isLogin(state,payload){
      state.isLogin = payload;
    },   

    add_data(state,payload){
      const {tabel, data} = payload;
      tabel.unshift(data);
    },

    deleteData(state,payload){
      const {tabel:type, id} = payload;
      let tabel = type === 'penerimaan'? state.tabel_penerimaan: state.tabel_pengeluaran;  
      const idx = tabel.findIndex((row)=> row.id === id);
      tabel.splice(idx,1);
    },
  },
  actions: {
    async addData({state,commit},payload){
     return new Promise((resolve,reject)=>{
        try {
          const {data, tabel:type} = payload;
          let tabel = type === 'penerimaan'? state.tabel_penerimaan: state.tabel_pengeluaran;     
          commit("add_data",{tabel,data});
          resolve();
        } catch (error) {
          reject(error)
        }
      })
    },

    async updateData({state},payload){
      const {data, tabel:type, id} = payload;
      let tabel = type === 'penerimaan'? state.tabel_penerimaan: state.tabel_pengeluaran; 
      const idx = tabel.findIndex((row)=> row.id === id);   
      tabel.splice(idx, 1, data);
    }
  },
  plugins: [createPersistedState({
    paths: ['isLogin']
  })],
})
