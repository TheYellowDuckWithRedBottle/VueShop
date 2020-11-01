// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css'
import ZkTable from 'vue-table-with-tree-grid'
import store from './store'


Vue.config.productionTip = false

Vue.use(ZkTable)
Vue.use(ElementUI);
Vue.filter('filterDate',function(date){
  const dt=new Date(date)
  const yy=dt.getFullYear()
  const mon=(dt.getMonth()+1+"").padStart(2,'0')
  const day=(dt.getDay()+1+"").padStart(2,'0')
  const h=dt.getHours()
  const min=dt.getMinutes()
  const sec=dt.getSeconds()
  return `${yy}-${mon}-${day} ${h}:${min}:${sec}`
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
