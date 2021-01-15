/**
 * 路由数组
 */
import MSite from '@/pages/MSite/MSite'
import Search from '@/pages/Search/Search'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Login from '@/pages/Login/Login' // 引入登陆注册路由

export default [
  {
    path: '/msite',
    component: MSite,
    meta: { // 路由源信息
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: { // 路由源信息
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: { // 路由源信息
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { // 路由源信息
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
