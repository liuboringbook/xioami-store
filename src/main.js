// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

// 样式导入
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'
import Axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:"/static/loading/loading-bars.svg"
})

Vue.prototype.$http = Axios;

Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
