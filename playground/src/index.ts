import type { App } from 'vue'
import Ellipsis from './components/ellipsis.vue'

export { Ellipsis }

export default {
  install(app: App) {
    app.component('Ellipsis', Ellipsis)
  },
}

