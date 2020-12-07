<template>
  <div class="page-login"
       :style="{backgroundImage: `url('${loginInfo.loginBackground}')`}">
    <div class="login-header">
      <img :src="loginInfo.loginLogo"
           class="login-logo">
    </div>
    <div class="login-box">
      <form class="login-form">
        <slot name="loginType">
          &nbsp;&nbsp;
        </slot>
        <div class="login-form-item">
          <login-form-input placeholder="请输入手机号"
                            icon="icon-login-zhanghao"
                            class="animated"
                            :class="{'shake invalid': !validate.mobile.valid}"
                            :maxlength="20"
                            v-model="entity.mobile"
                            @blur="onBlurAccount"
                            @enter="login"
                            ref="account" />
          <span class="login-form-error animated fadeIn"
                v-show="!validate.mobile.valid">请输入11位手机号码</span>
        </div>
        <div class="login-form-item">
          <login-form-input placeholder="请输入4位验证码"
                            icon="icon-login-mima"
                            class="animated"
                            :class="{'shake invalid': !validate.code.valid}"
                            :maxlength="4"
                            v-model="entity.code"
                            @blur="onBlurCode"
                            @enter="login"
                            ref="code">
            <a-button type="link"
                      class="login-code"
                      :disabled="code.disabled"
                      @click="e => verifyModule.show(e)">{{code.disabled ? `${code.time}秒`: '获取验证码'}}</a-button>
          </login-form-input>
        </div>
        <div class="login-form-item">
          <a-button type="primary"
                    class="login-form-btn animated"
                    @click.native.prevent="login">{{loginBtnTitle}}</a-button>
          <slot name="btns" />
        </div>
      </form>
    </div>
    <div class="login-footer">
      技术支持：{{loginInfo.technicalSupport}} (推荐使用谷歌浏览器、火狐浏览器以及360极速浏览器)
      <br />
      网站ICP备案号：{{loginInfo.record}} Copyright {{loginInfo.instructions}} 版权所有
    </div>

    <a-modal title="验证"
             v-model="verifyModule.visible"
             :footer="null"
             width="600px"
             :maskClosable="false">
      <LoginVerify v-if="verifyModule.visible"
                   @success="verifyModule.success" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import LoginFormInput from '@/components/packages/login/loginFormInput/index.vue'
import loading from '@/components/libs/loading'
import {
  loginRememberMeLocal,
  loginAccountLocal,
  broadcastLoginLocal,
  getLoginInfo,
  setLoginInfo,
} from '@/storage'
import RSAUtils from '@/assets/vendors/rsa'
import * as actionTypes from '@/store/actionTypes'
import LoginREQ from '@/api/common/v1.0/definitions/LoginREQ'
import { AccountApi } from '@/api/common/v1.0/accountApi'
import { Timer, VueModule } from '@/utils'
import LoginBO from '@/api/common/v1.0/definitions/LoginBO'
import LoginVerify from './components/verify.vue'
import { SearchApi } from '@/api/common/v1.0/searchApi'
import OemLoginConfigBO from '@/api/common/v1.0/definitions/OemLoginConfigBO'
import { LoginTypeEnum } from '@/constants'
import { loginInfo } from '@/config'

@Component({
  components: {
    LoginFormInput,
    LoginVerify,
  },
})
export default class SystemLogin extends Vue {
  @Prop({
    type: String,
    default: '登录',
  })
  private loginBtnTitle!: string

  // 登录参数
  private entity = new LoginREQ()
  // 校验
  private validate = {
    mobile: {
      valid: true,
    },
    code: {
      valid: true,
    },
  }

  private code = {
    disabled: false,
    time: 60,
  }
  private timer = new Timer()

  // 登录页相关信息
  private loginInfo = getLoginInfo(LoginTypeEnum.SYSTEM) as OemLoginConfigBO

  private loginBroadIndex = -1

  @Action(actionTypes.AFTER_LOGIN)
  private afterLogin: any

  private verifyModule = VueModule.create({
    show: (target: any, e: Event) => {
      if (this.code.disabled === false && this.validateAccount()) {
        target.visible = true
      }
      e.stopPropagation()
    },
    success: (target: any) => {
      target.hide()
      this.getCode()
    },
  })

  private created() {
    // 服务商配置的登录页信息
    SearchApi.getLoginConfig({
      domain: location.hostname,
    }).then((data) => {
      data = data || loginInfo
      this.loginInfo = data
      setLoginInfo(LoginTypeEnum.SYSTEM, data)
    })

    // 注册登录广播事件
    this.loginBroadIndex = broadcastLoginLocal.onBroadcast(() => {
      location.reload()
    })
  }

  private mounted() {
    this.$nextTick(() => {
      const accountRef = this.$refs.account as LoginFormInput
      accountRef.focus()
    })
  }

  private destroyed() {
    broadcastLoginLocal.offBroadcast(this.loginBroadIndex)
    this.timer.clear()
  }

  private getCode(e?: Event) {
    if (this.code.disabled === false && this.validateAccount()) {
      AccountApi.sendSms({
        mobile: this.entity.mobile as string,
      }).then((data) => {
        this.success('验证码已发送')
        this.entity.index = data.index
        this.entity.code = data.code
        this.code.time = 60
        this.code.disabled = true
        const timer = this.timer.setInterval(() => {
          if (this.code.time-- <= 0) {
            this.code.disabled = false
            this.timer.clearInterval(timer)
          }
        }, 1000)

        const codeRef = this.$refs.code as LoginFormInput
        codeRef.focus()
        codeRef.select()
      })
    }
    if (e) {
      e.stopPropagation()
    }
  }

  // 登录
  private async login() {
    if (this.validateAccount() && this.validateCode()) {
      const entity = Object.assign({}, this.entity, {
        domain: location.hostname,
      })
      loading.show()
      try {
        const data = await AccountApi.login(entity, { loading: false })
        this.afterLogin(data)
        broadcastLoginLocal.random()
        this.emitSuccess(data)
      } catch (e) {}
      loading.hide()
    }
  }

  // 校验账号
  private validateAccount(mobile: string = this.entity.mobile as string) {
    return (this.validate.mobile.valid = /^1\d{10}$/.test(mobile))
  }

  // 校验验证码
  private validateCode(code: string = this.entity.code as string) {
    return (this.validate.code.valid = /^.{4}$/.test(code))
  }

  private onBlurAccount() {
    this.validateAccount()
  }

  private onBlurCode() {
    this.validateCode()
  }

  // 账号输入框获得焦点
  private focusAccount() {
    if (this.$refs.account) {
      const accountRef = this.$refs.account as LoginFormInput
      accountRef.focus()
      accountRef.select()
    }
  }

  @Emit('success')
  private emitSuccess(data: LoginBO) {}
}
</script>
