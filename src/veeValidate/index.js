import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'  // eslint-disable-line

// 声明使用Vue插件
Vue.use(VeeValidate) // 指令 v-validate / errors / $validator

// 指定提示文本的为中文
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  // 根据name属性名称映射对应的中文提示名称
  attributes: {
    phone: '手机号',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '验证码'
  }
})

// 自定义验证规则
VeeValidate.Validator.extend('mobile', {
  // 验证函数
  validate: value => {
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
