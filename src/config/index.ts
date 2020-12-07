import {
  cipher
} from 'vma-assist'

const config: any = cipher.decodeJSON(process.config)

export const nodeEnv: string = config.NODE_ENV
export const DEBUG_MODE: boolean = config.DEBUG_MODE
export const isDev = config.NODE_ENV === 'dev' || config.NODE_ENV === 'development'
export const api: string = config.api
export const appNamespace: string = `${nodeEnv}/${config.app}`
export const loginInfo = {
  domain: '',
  id: -1,
  instructions: '客迹科技有限公司',
  loginBackground: 'https://keji-res.h5h5h5.cn/5ad9c87a-5c3f-4466-b990-8eb9e40e0a0d',
  loginLogo: 'https://resource.v-ma.com/image/wecom/logo.png',
  loginLogoIcon: 'https://resource.v-ma.com/image/wecom/logo-icon.png',
  loginNameLogo: '超级后台',
  platformId: -1,
  record: '',
  technicalSupport: '客迹科技有限公司',
}
export const ckeditorUploadUrl = `${api}/common/v1.0/oss/qiniu/editor4.4`
export const getQiniuTokenUrl = () => `${api}/common/v1.0/oss/qiniu/qiniutoken`
