import { RouterWrapper } from 'vma-assist/dist/static/js/tools/vue'
import { Modal } from 'ant-design-vue'

RouterWrapper.extendConfig({
  confirm() {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '系统提示',
        content: '页面加载失败，点击确定或刷新页面重新加载',
        onOk() {
          resolve()
        },
        onCancel() {
          reject()
        }
      })
    })
  }
})

export * from 'vma-assist/dist/static/js/utils'
export * from 'vma-assist/dist/static/js/tools/vue'
export * from './date'

export const empty = (value: string, placerholder = '--') => {
  return !!value ? value : placerholder
}

export const getLastChar = (value: string) => {
  return !!value ? String(value).substr(value.length - 1) : '-'
}
