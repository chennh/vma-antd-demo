import { loading } from 'vma-vue-antd'

let requestCount = 0
let timer: any
const show: any = {
  timer: 0,
  loading: false
}

export default {
  show(time = 50) {
    if (show.loading) {
      return
    }
    if (show.timer) {
      clearTimeout(show.timer)
    }
    show.timer = setTimeout(() => {
      show.loading = true
      requestCount++
      loading.show()
    }, time)
  },
  hide(time = 50) {
    if (--requestCount <= 0) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        loading.hide()
      }, time)
    }
  }
}
