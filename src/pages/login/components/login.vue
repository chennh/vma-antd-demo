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
          <div class="login-tabs">
            <span class="login-tab-item active">{{title}}</span>
          </div>
        </slot>
        <div class="login-form-item">
          <login-form-input placeholder="请输入登录账号"
                            icon="icon-login-zhanghao"
                            class="animated"
                            :class="{'shake invalid': !validate.account.valid}"
                            :maxlength="20"
                            v-model="entity.account"
                            @blur="onBlurAccount"
                            @enter="login"
                            ref="account" />
        </div>
        <div class="login-form-item">
          <login-form-input type="password"
                            placeholder="请输入登录密码"
                            icon="icon-login-mima"
                            class="animated"
                            :class="{'shake invalid': !validate.password.valid}"
                            :maxlength="20"
                            v-model="entity.password"
                            @blur="onBlurPassword"
                            @enter="login" />
        </div>
        <div class="login-form-item">
          <div class="login-form-code">
            <div class="code-img"
                 @click="clickQRCode">
              <img :src="qrCodeUrl">
            </div>
            <login-form-input placeholder="请输入验证码"
                              icon="icon-login-yanzhengma"
                              class="animated"
                              :class="{'shake invalid': !validate.qrCode.valid}"
                              :maxlength="4"
                              v-model="entity.code"
                              @blur="onBlurQRCode"
                              @enter="login"
                              ref="qrCode" />
          </div>
        </div>
        <div class="login-form-item">
          <a-button type="primary"
                    class="login-form-btn animated"
                    @click="login">登录</a-button>
        </div>
        <div class="login-form-item">
          <a-checkbox class="login-form-remember"
                      v-model="rememberMe">记住我</a-checkbox>
        </div>
      </form>
    </div>
    <div class="login-footer">
      技术支持：{{loginInfo.technicalSupport}} (推荐使用谷歌浏览器、火狐浏览器以及360极速浏览器)
      <br />
      网站ICP备案号：{{loginInfo.record}} Copyright {{loginInfo.instructions}} 版权所有
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import LoginFormInput from '@/components/packages/login/loginFormInput/index.vue'
import loading from '@/components/libs/loading'
import {
  setLoginRememberMe,
  getLoginRememberMe,
  setLoginAccount,
  getLoginAccount,
  broadcastLoginLocal,
  loginTypeLocal,
  getLoginInfo,
  setLoginInfo,
} from '@/storage'
import { loginInfo } from '@/config'
import { redirectToHome } from '@/router'
import RSAUtils from '@/assets/vendors/rsa'
import * as actionTypes from '@/store/actionTypes'
import { PlatformApi } from '@/api/common/v1.0/platformApi'
import PlatLoginREQ from '@/api/common/v1.0/definitions/PlatLoginREQ'
import { LoginTypeEnum, LOGIN_TYPE_CONST } from '@/constants'
import OemLoginConfigBO from '@/api/super/v1.0/definitions/OemLoginConfigBO'
import { SearchApi } from '@/api/common/v1.0/searchApi'

@Component({
  components: {
    LoginFormInput,
  },
})
export default class Login extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  public loginType!: LoginTypeEnum

  // 登录参数
  private entity: PlatLoginREQ = {
    account: '',
    code: '',
    index: '',
    password: '',
    randomIndex: '',
    type: this.loginType,
    domain: location.hostname,
  }
  // 校验
  private validate = {
    account: {
      valid: true,
    },
    password: {
      valid: true,
    },
    qrCode: {
      valid: true,
    },
  }
  // 记住我
  private rememberMe = false
  // 验证码图片
  private qrCodeUrl = ''
  // 登录页相关信息
  private loginInfo = getLoginInfo(LoginTypeEnum.SYSTEM) as OemLoginConfigBO

  private loginBroadIndex = -1

  @Action(actionTypes.AFTER_LOGIN)
  private afterLogin: any

  private get title() {
    return LOGIN_TYPE_CONST.get(this.loginType)
  }

  private created() {
    if (this.loginType === LoginTypeEnum.SUPER) {
      this.loginInfo = loginInfo
      setLoginInfo(this.loginType, loginInfo)
    } else {
      // 服务商配置的登录页信息
      SearchApi.getLoginConfig({
        domain: location.hostname,
      }).then((data) => {
        data = Object.assign({}, loginInfo, data)
        this.loginInfo = data
        setLoginInfo(LoginTypeEnum.SYSTEM, data)
      })
    }

    this.rememberMe = getLoginRememberMe(this.loginType)
    if (this.rememberMe) {
      this.entity.account = getLoginAccount(this.loginType)
    }
    this.refreshQRCode()

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

    loginTypeLocal.set(String(this.loginType))
  }

  private destroyed() {
    broadcastLoginLocal.offBroadcast(this.loginBroadIndex)
  }

  // 登录
  private async login() {
    if (
      this.validateAccount() &&
      this.validatePassword() &&
      this.validateQRCode()
    ) {
      const entity = Object.assign({}, this.entity)
      loading.show()
      try {
        const {
          randomIndex,
          exponent,
          modulus,
        } = await PlatformApi.getEncryption({
          loading: false,
        })
        RSAUtils.setMaxDigits(200)
        // 第一个参数为加密指数、第二个参数为解密参数、第三个参数为加密系数
        const key = RSAUtils.getKeyPair(exponent, '', modulus)
        entity.password = RSAUtils.encryptedString(key, entity.password)
        entity.randomIndex = randomIndex
        const loginBO = await PlatformApi.platformLogin(entity, {
          loading: false,
        })
        if (
          !loginBO ||
          !loginBO.resourceMenuList ||
          loginBO.resourceMenuList.length === 0
        ) {
          this.warning('暂无权限，请联系管理员')
        } else {
          this.resetRememberMe(entity.account)
          this.afterLogin(loginBO)
          redirectToHome()
          broadcastLoginLocal.random()
        }
      } catch (e) {}
      loading.hide()
    }
  }

  // 点击验证码图片时，刷新验证码
  private clickQRCode() {
    this.refreshQRCode()
    this.entity.code = ''
    if (this.$refs.qrCode) {
      const qrCode = this.$refs.qrCode as any
      qrCode.select()
    }
  }

  // 刷新验证码
  private refreshQRCode() {
    PlatformApi.getVerificationCode().then((data) => {
      this.entity.index = data.index
      this.qrCodeUrl = /^data/i.test(data.code)
        ? data.code
        : `data:image/png;base64,${data.code}`
    })
  }

  // 校验账号
  private validateAccount(account: string = this.entity.account) {
    return (this.validate.account.valid = !!account)
  }

  // 校验密码
  private validatePassword(password: string = this.entity.password) {
    return (this.validate.password.valid = !!password)
  }

  // 校验验证码
  private validateQRCode(qrCode: string = this.entity.code) {
    return (this.validate.qrCode.valid = !!qrCode && /^.{4}$/.test(qrCode))
  }

  private onBlurAccount() {
    this.validateAccount(this.entity.account)
  }

  private onBlurPassword() {
    this.validatePassword(this.entity.password)
  }

  private onBlurQRCode() {
    this.validateQRCode(this.entity.code)
  }

  // 重新设置[记住我]
  private resetRememberMe(account: string) {
    const rememberMe = this.rememberMe
    setLoginRememberMe(this.loginType, this.rememberMe)
    setLoginAccount(this.loginType, rememberMe ? account : '')
  }

  // 账号输入框获得焦点
  private focusAccount() {
    if (this.$refs.account) {
      const accountRef = this.$refs.account as LoginFormInput
      accountRef.focus()
      accountRef.select()
    }
  }
}
</script>
