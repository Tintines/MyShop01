/**
 * 包含n个接口请求函数的模块
 */
import ajax from './ajax'

// 1.根据经纬度获取位置详情  返回的是 promise对象
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`)

// 2.获取食品分类列表   返回的是 promise对象
export const reqCategorys = () => ajax('/index_category', {
  headers: {
    needCheck: true
  }
})

// 3.根据经纬度获取商铺列表    返回的是 promise对象
export const reqShops = ({ longitude, latitude }) => ajax('/shops', {
  params: { latitude, longitude },
  headers: {
    needCheck: true
  }
})

// 4.发送短信验证码
export const reqSendCode = (phone) => ajax.get('/sendcode', {
  params: {
    phone
  }
})

// 5.用户名密码登录
// export const reqPwdLogin = ({name, pwd, captcha}) => ajax.post('/login_pwd', {name, pwd, captcha})
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
  url: '/login_pwd',
  method: 'POST',
  data: { name, pwd, captcha }
})

// 6.手机号验证码登录
export const reqSmsLogin = ({ phone, code }) => ajax.post('/login_sms', { phone, code })

// 7.自动登录
export const reqAutoLogin = () => ajax.get('/auto_login')

// 8.获取goods
export const reqGoods = () => ajax('/goods')

// 9.获取ratings
export const reqRatings = () => ajax('/ratings')

// 10.获取info
export const reqInfo = () => ajax('/info')
