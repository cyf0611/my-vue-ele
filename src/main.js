import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/'
import routes from './router/router'
import {routerMode} from './config/env'
import FastClick from 'fastclick'
import './config/rem'
// fastClick 插件解决移动端click事件300ms延迟
if('addEventListener' in document) {
    document.addEventListener('DOMContentloaded', function() {
        FastClick.attach(document.body);
    }, false)
}
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    strick: process.env.NODE_ENV !== 'production',
    
})

new Vue({
    router,
    store,
}).$mount('#app');