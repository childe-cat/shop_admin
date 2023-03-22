import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store";
import axios from "axios";
import utils from '@/utils/util1'
import vuetify from './plugins/vuetify'
import *as echarts from 'echarts'

Vue.prototype.utils = utils
Vue.prototype.axios = axios
Vue.config.productionTip = true
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
