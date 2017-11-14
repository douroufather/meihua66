// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//import Tree from 'hsy-vue-tree'
//import 'element-ui/lib/theme-default/index.css'
import '../theme/index.css'
import '@/assets/iconfont.css'
import router from './router'
import $ from 'jquery'

/*import Mock from './mock'
Mock.init()*/

Vue.config.productionTip = false
Vue.use(ElementUI)
//Vue.use(Tree)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
