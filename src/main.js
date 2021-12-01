import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faArrowCircleRight,
  faCheckCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VTooltip from 'v-tooltip'

import 'v-tooltip/dist/v-tooltip.css'

library.add(faPlus, faArrowCircleRight, faCheckCircle, faTrash)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VTooltip)
app.use(store)

app.mount('#app')
