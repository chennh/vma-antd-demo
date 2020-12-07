import { VueConstructor } from 'vue'
import 'ant-design-vue/dist/antd.less'
import AntDesign, { message, Icon } from 'ant-design-vue'
import { eachOwn } from '@/utils'

export default {
  install(Vue: VueConstructor) {
    Vue.use(AntDesign)
    Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_2162865_r105pkpvlr.js'
    })
    eachOwn(message, (fn, name) => {
      Vue.prototype[name] = fn
    })
  }
}

