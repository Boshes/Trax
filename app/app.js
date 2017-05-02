import Vue from 'vue'
import App from './app.vue'
import VueMaterial from 'vue-material'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueMaterial)

Vue.use(VueProgressBar, {
  color: 'rgb(50,205,50)',
  failedColor: 'red',
  thickness: '5px',
   transition: {
    speed: '1s',
    opacity: '1s'
  },
  autoRevert: true
})

new Vue({
  el: '#app',
  components: { App }
})


