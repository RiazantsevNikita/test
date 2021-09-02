import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/style/bootstrap.css"
import "./assets/style/dataTables.bootstrap.css"
import "./assets/style/metisMenu.min.css"
import "./assets/style/morris.css"
import "./assets/style/sb-admin-2.css"
import "./assets/style/social-buttons.css"
import "./assets/style/timeline.css"

Vue.config.productionTip = false
console.log(process.env.VUE_APP_BASE_URL);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
