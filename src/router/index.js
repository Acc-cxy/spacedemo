import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import home from "@/pages/home/home";
import diary from "@/pages/diary/diary";
import space from "@/pages/space/space";
import login from "@/pages/login/login";
import bemyself from "@/pages/bemyself/bemyself";
import echarts from "@/pages/Echarts/echarts";
import ANTVG6 from "@/pages/ANTVG6/ANTVG6";
import test from "@/pages/test/test";

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
            path:'/echarts',
            name: echarts,
            component: echarts
        },
        {
            path: '/login',
            name: login,
            component: login
        },
        {
            path:'/ANTVG6',
            name:ANTVG6,
            component:ANTVG6
        },
        {
          path:'/test',
          name:test,
          component:test
        }
    ],
    mode: 'hash',
    base: process.env.BASE_URL
})
