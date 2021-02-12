import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/dashboard_layout.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'dashboard',
    component: layout,
    children:[
      {
        path:"/dashboard",
        name:"dashboard",
        component:()=> import('../views/dashboard/dashboard.vue')
      },
      {
        path:"/tabel",
        name:"tabel",
        component:()=> import('../views/tabel/tabel.vue')
      },
      {
        path:"/pengeluaran",
        name:"pengeluaran",
        component:()=> import('../views/pengeluaran/pengeluaran.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{
  if(to.path !== "/login"){
    if(store.state.isLogin) return next();    
    return router.replace("/login");
     
  }else{

    if(store.state.isLogin)return router.replace("/");
    return next();
  }
})

export default router
