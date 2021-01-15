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
                    <div :class="{on: isShowSms}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" onfocus="this.placeholder=''" onblur="this.placeholder='手机号'">
                            <button :disabled="!isRightPhone" @click.prevent="sendCode" class="get_verification"
                            :class="{right_phone_number: isRightPhone}">获取验证码</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" onfocus="this.placeholder=''" onblur="this.placeholder='验证码'">
                        </section>
                        <section class="login_hint">
                            <span>温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意</span>
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !isShowSms}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" onfocus="this.placeholder=''" onblur="this.placeholder='手机/邮箱/用户名'">
                            </section>
                            <section class="login_verification">
                                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" onfocus="this.placeholder=''" onblur="this.placeholder='密码'">
                                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                                    <div class="switch_circle" :class="{right: isShowPwd}"></div>
                                    <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" onfocus="this.placeholder=''" onblur="this.placeholder='验证码'">
                                <img class="get_verification" src="./images/captcha.svg" alt="captcha">
                            </section>
                        </section>
                    </div>
                        <button class="login_submit">登录</button>
                </form>
            </div>
                <a href="javascript:;" class="go_back" @click="$router.back()">
                    <i class="iconfont icon-jiantou2"></i>
                </a>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Login',

  data () {
    return {
      isShowSms: true, // true: 显示短信登陆界面,  false: 显示密码登陆界面
      phone: '',
      isShowPwd: false // 密码是否可见
    }
  },

  computed: {
    isRightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },

  methods: {
    sendCode () {
      alert('--已发送--')
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
