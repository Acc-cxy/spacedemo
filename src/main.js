import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios";

//点击图片放大
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)

Vue.prototype.$bus =new Vue()
Vue.config.productionTip = false
Vue.use(router);

//全局变量api
import api from './network/httphome'
Vue.prototype.$api = api;

//进度条
import NProgress from 'nprogress'

router.beforeEach((to, from, next) => { // 无论刷新还是跳转路由，第一个进入的都是这个前置钩子函数
  NProgress.start();
  let isok = sessionStorage.user;
  if(isok){
    if(to.fullPath == '/bemyself'){
      const isokarr = isok.split(",");
      const islogin = isokarr[0];
      next({
        path: '/bemyself?id='+islogin
      })
      return;
    }
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

router.afterEach(()=>{
 NProgress.done()
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
