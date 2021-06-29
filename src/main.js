import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'

Vue.use(Clipboard)

Vue.use(Vuex);

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
