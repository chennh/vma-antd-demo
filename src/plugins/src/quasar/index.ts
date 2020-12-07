import { VueConstructor } from 'vue'
import Quasar from 'quasar'
import 'quasar/dist/quasar.min.css'
import langZhHans from 'quasar/lang/zh-hans.js'
import materialIcons from 'quasar/icon-set/material-icons.js'
import 'quasar-extras/material-icons/material-icons.css'

export default {
  install(Vue: VueConstructor) {
    Vue.use(Quasar as any, {
      lang: langZhHans,
      iconSet: materialIcons
    })
  }
}
