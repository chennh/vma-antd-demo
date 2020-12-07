import { VueConstructor } from 'vue'
import vmaAssistPlugin from './src/vmaAssist'
import vueRouter from './src/vueRouter'
import vueCompositionApi from './src/vueCompositionApi'
import { fmt } from '@/utils'
import AntDesign from './src/antDesign'
import QuasarPlugin from './src/quasar'
import VueDND from 'awe-dnd'
import CKEditor from 'ckeditor4-vue'
import vmaAntdPlugin from './src/vmaAntd'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaAssistPlugin)
    Vue.use(vueRouter)
    Vue.use(vueCompositionApi)
    Vue.use(AntDesign)
    Vue.use(QuasarPlugin)
    Vue.use(VueDND)
    Vue.use(CKEditor)
    Vue.use(vmaAntdPlugin)
    Vue.prototype.fmt = fmt
  }
}
