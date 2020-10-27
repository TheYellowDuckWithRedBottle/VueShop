// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css'
import ZkTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

Vue.filter('formatDate',function(date){
    const dates=new Date(date)
    const yy=dates.getFullYear()
    const month=(dates.getMonth()+1+'').padStart(2,0)
    const day=dates.getDate()
    const hour=dates.getHours()
    const min=dates.getMinutes()
    const second=dates.getSeconds()
  return `${yy}-${month}-${day} ${hour}:${min}:${second}`

})
Vue.use(ElementUI);
Vue.use(ZkTable)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
