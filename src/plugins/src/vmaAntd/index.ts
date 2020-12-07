import { VueConstructor } from 'vue'
import VmaAntd from 'vma-vue-antd'
import { getQiniuTokenUrl } from '@/config/index'
import axios from 'axios'

export default {
  install(Vue: VueConstructor) {
    Vue.use(VmaAntd as any, {
      components: {
        upload: {
          qiniuOption: {
            tokenUrl: getQiniuTokenUrl(),
            getToken(option: any) {
              return axios({
                url: option.tokenUrl,
                method: 'GET',
                responseType: 'json',
              }).then((response) => response.data || response) as any
            },
          }
        }
      }
    })
  }
}
