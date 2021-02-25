import {
  message,
  Modal
} from 'ant-design-vue'
import {
  redirectToLogin,
  redirectToCommonMaintain
} from '@/router'
import {
  isDev
} from '@/config'
import store from '@/store'
import * as actionTypes from '@/store/actionTypes'
import {
  adminInfoSession,
  adminInfoSessionHasData
} from '@/storage'
import { AxiosError } from 'axios'
import EventBus from '@/constants/eventBus'
import main from '@/main'

function handleError(data: any) {
  message.warn(data.message)
}

let exceptionMessageHasShow = false

function handleException(error: any) {
  const {
    status,
    message,
    stack
  } = error
  if (exceptionMessageHasShow === false) {
    if (isDev) {
      Modal.error({
        title: message || '系统提示',
        content: (h: any) => {
          return h('div', {
            style: {
              'max-height': '250px',
              'overflow': 'auto'
            }
          }, stack)
        },
        onOk() {
          exceptionMessageHasShow = false
        }
      })
    } else {
      Modal.error({
        title: '系统提示',
        content: `服务繁忙，请稍后再试`,
        onOk() {
          exceptionMessageHasShow = false
        }
      })
    }
    exceptionMessageHasShow = true
  }
}

let onHandling401 = false
export function handle401(response: any) {
  if (!onHandling401) {
    onHandling401 = true
    let message = ''
    switch (String(response.code).toUpperCase()) {
      case 'KICK_OUT':
        message = '您的账号已被踢下线'
        break
      case 'AUTHORIZATION_NONCE_TIMESTAMP_INVALID':
        message = '系统时间与服务时间差异过大，请校对系统时间'
        break
      default:
        message = '授权过期，请重新登录'
    }
    // 登录状态下才做401提示
    if (adminInfoSessionHasData()) {
      handleError({
        message
      })
    }
    adminInfoSession.remove()
    // 未登录/登录授权过期
    redirectToLogin()
    setTimeout(() => {
      onHandling401 = false
    }, 500)
  }
}

export function handleMaintain(error: any) {
  redirectToCommonMaintain()
}

export function handleMaintainError(response: any) {
  store.dispatch(actionTypes.AFTER_LOGOUT)
  redirectToCommonMaintain()
  handleError({
    message: '系统维护中，请稍候'
  })
}

export function handleResponseError(error: AxiosError, handleMaintainFn?: (error: Error) => void) {
  if (error.response == null) {
    if (error.message === 'Network Error') {
      handleMaintain(error)
    } else {
      handleException({
        status: 500,
        message: error.message,
        stack: error.stack
      })
    }
  } else {
    if (error.response.status === 401) {
      handle401(error.response.data || {})
    } else if (error.response.status === 502) {
      handleMaintain(error)
    } else if (error.response.data != null) {
      // 企业已禁用
      // if (error.response.data.code === 'DISABLE') {
      //   return main.$emitBus(EventBus.Frame.invalid)

      // }
      if (error.response.data.businessException === true) {
        handleError(error.response.data)
      } else {
        handleException({
          status: error.response.status,
          message: error.message,
          stack: error.response.data.stackTrace ? (error.response.data.stackTrace || []).map((v: any) => `${v.className}.${v.methodName}(${v.lineNumber})`)
            .join('<br />') : error.stack
        })
      }
    } else {
      handleException({
        status: error.response.status,
        message: error.message,
        stack: error.stack
      })
    }
  }
}

export default (error: AxiosError) => {
  handleResponseError(error, response => {
    handleMaintain(response)
  })
}
