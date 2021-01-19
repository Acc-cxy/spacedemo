import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import home from "@/pages/home/home";
import diary from "@/pages/diary/diary";
import space from "@/pages/space/space";
import login from "@/pages/login/login";
import bemyself from "@/pages/bemyself/bemyself";

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
    routes: [
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            name:home,
            component:home
        },
        {
            path: '/diary',
            name: diary,
            component: diary
        },
        {
          path:'/bemyself',
          name:bemyself,
          component: bemyself,
          meta: {
              requireAuth: true  //是否需要验证
          }
        },
        {
            path: '/space',
            name:space,
            component: space,
            meta: {
                requireAuth: true  //是否需要验证
            }
        },
        {
            path: '/login',
            name: login,
            component: login
        }
    ],
    mode: 'hash',
    base: process.env.BASE_URL
})
