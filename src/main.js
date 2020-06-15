import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// fastclick 是具有消除移动端浏览器上的点击事件的 300ms 的延迟的作用。
FastClick.attach(document.body)

// 使用图片懒加载的插件
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.gif')
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
