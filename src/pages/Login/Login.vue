<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <!-- 设计状态数据 -->
                    <a href="javascript:;" :class="{on: isShowSms}" @click="isShowSms=true">短信登录</a>
                    <a href="javascript:;" :class="{on: !isShowSms}" @click="isShowSms=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form >
                    <!-- 短信验证码登录 -->
                    <div :class="{on: isShowSms}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone" v-validate="'required|mobile'" onfocus="this.placeholder=''" onblur="this.placeholder='手机号'">
                            <!-- 点击获取验证码后不允许按钮再次被点击 -->
                            <button :disabled="!isRightPhone || computeTime > 0" @click.prevent="sendCode" class="get_verification"
                            :class="{right_phone_number: isRightPhone, onComputeTime: computeTime>0}">{{computeTime>0 ? `请${computeTime}后再点击` : '获取验证码'}}</button>
                            <!-- 表单验证 -->
                            <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码"
                            onfocus="this.placeholder=''" onblur="this.placeholder='验证码'"
                            v-model="code" name="code" v-validate="{required: true, regex: /^\d{6}$/}">
                            <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
                        </section>
                        <section class="login_hint">
                            <span>温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意</span>
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <!-- 用户名密码登录 -->
                    <div :class="{on: !isShowSms}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名"
                                onfocus="this.placeholder=''" onblur="this.placeholder='手机/邮箱/用户名'" v-model="name" name="name" v-validate="'required'">
                                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </section>
                            <section class="login_verification">
                                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码"
                                onfocus="this.placeholder=''" onblur="this.placeholder='密码'" v-model="pwd" name="pwd" v-validate="'required'">
                                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                                    <div class="switch_circle" :class="{right: isShowPwd}"></div>
                                    <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                                </div>
                                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" onfocus="this.placeholder=''"
                                onblur="this.placeholder='验证码'" v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
                                <!-- 当前发送是一个跨域的http请求(不是ajax请求), 没有跨域的问题. 向服务器发送普通HTTP请求获取动态验证码-->
                                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @click="updateCaptcha">
                                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                            </section>
                        </section>
                    </div>
                    <button class="login_submit" @click.prevent="login">登录</button>
                </form>
            </div>
                <a href="javascript:;" class="go_back" @click="$router.back()">
                    <i class="iconfont icon-jiantou2"></i>
                </a>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'Login',
  data () {
    return {
      isShowSms: true, // true: 显示短信登陆界面,  false: 显示密码登陆界面
      phone: '', // 电话号码
      isShowPwd: false, // 密码是否可见
      computeTime: 0, // 点击验证码后的倒计时
      code: '', // 验证码
      pwd: '', // 密码
      captcha: '', // 验证码
      name: '' // 用户名
    }
  },

  computed: {
    isRightPhone () { // 验证手机号
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
    }
  },

  methods: {
    async sendCode () { // 发送验证码
      //  倒计时效果显示
      //  点击后重置倒计时
      this.computeTime = 10
      const intervalId = setInterval(() => {
        this.computeTime--
        if (this.computeTime <= 0) {
          this.computeTime = 0
          clearInterval(intervalId)
        }
      }, 1000)

      // 发送请求 (不需要数据共享,直接发送即可)
      const result = await this.$API.reqSendCode(this.phone)
      if (result.code === 0) {
        Toast('验证码短信已发送')
      } else {
        // 停止倒计时
        this.computeTime = 0
        MessageBox('提示', result.msg || '发送失败')
      }
    },

    async login () {
      // console.log('点击了')
      // 1.进行前台表单验证
      let names // 变量定义的到外面时if-else中可同时书写对该变量进行赋值的语句
      if (this.isShowSms) { // 手机验证码登录
        // console.log('进入了手机验证码')
        names = ['phone', 'code']
      } else { // 用户名密码登录
        names = ['name', 'pwd', 'captcha']
      }

      const success = await this.$validator.validateAll(names) // 对指定的表单项进行验证
      // console.log(success)
      // 2.如果验证通过,发送登录请求
      let result // 变量定义的到外面时if-else中可同时书写对该变量进行赋值的语句
      if (success) {
        // 2.1收集表单项
        const { isShowSms, phone, code, name, pwd, captcha } = this
        // 2.2判断用户登录的方式
        if (isShowSms) { // 短信登录
          // console.log(phone, code)
          result = await this.$API.reqSmsLogin({ phone, code })
          // console.log(result)
        } else { // 密码登录
          console.log(name, pwd, captcha)
          result = await this.$API.reqPwdLogin({ name, pwd, captcha })
          console.log(result)
          this.updateCaptcha() // 更新图形验证码
          this.captcha = '' // 清空之前的验证码
        }

        // 3.根据请求的结果,做不同响应处理
        if (result.code === 0) {
          console.log('请求成功')
          const user = result.data
          // 将user保存到vuex的state
          this.$store.dispatch('saveUser', user) // 将user和token保存到state,将token保存local

          // 跳转到个人中心
          // this.$router.replace({path: '/profile'})
          this.$router.replace('/profile')
        } else {
          MessageBox('提示', result.msg)
        }
      }
    },

    // 点击更新动态验证码
    updateCaptcha () {
      // console.log('点击了')
      // 需要每次发送不同的地址,这样浏览器才会不读取缓存,重新发送请求才会返回新的数据,通过传参添加时间戳 ?time=${Date.now()}
      this.$refs.captcha.src = `http://localhost:4000/captcha?time=${Date.now()}`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    .loginContainer
        width 100%
        height 100%
        background #ffffff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight 700
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #dddddd
                            border-radius 4px
                            outline none
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774
                            &::placeholder  //修改 placeholder 样式
                                color #ccc
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #ffffff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border none
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone_number
                                    color #02a774
                                &.onComputeTime // 倒计时修改倒计时文本的颜色
                                    color #ccc
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #ffffff
                            .switch_button
                                font-size 12px
                                border-radius 8px
                                transition background-color .6s border-color .5s
                                padding 0 6px
                                width 28px
                                height 16px
                                line-height 16px
                                color #ffffff
                                position absolute
                                top 50%
                                right 12px
                                transform translateY(-50%)
                                &.off
                                    backfround #ffffff
                                    .switch_text
                                        float right
                                        color #dddddd
                                &.on
                                    background #02a774
                                >.switch_circle
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .1s
                                    &.right
                                        transform translateX(27px)
                        .login_hint
                            margin-top 12px
                            span
                                color #999
                                font-size 12px
                                line-height 20px
                            >a
                                color #02a774
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 40px
                        color #ffffff
                        background #4cd96f
                        font-size 16px
                        line-height 42px
                        border none
                .about_us
                    diaplay block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999

</style>
