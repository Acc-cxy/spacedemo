import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios";
import space from "@/pages/space/space";
import el from "element-ui/src/locale/lang/el";

Vue.prototype.$bus =new Vue()
Vue.config.productionTip = false
Vue.use(router);

//全局变量api
// import api from './network/httphome'
// Vue.prototype.$api = api;

router.beforeEach((to, from, next) => { // 无论刷新还是跳转路由，第一个进入的都是这个前置钩子函数
  let isok = sessionStorage.user
  if(isok){
      next()
      return;
  }
  if (to.meta.requireAuth) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
