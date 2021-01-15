/**
 * 包含n个用于间接更新状态数据的方法的对象
 * 方法可以包含异步和逻辑处理代码
 */
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '@/api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  // 获取当前地址信息对象的异步action
  async getAddress ({ commit, state }) {
    const { longitude, latitude } = state
    // console.log('getAddress',state ,longitude, latitude )
    // 1.发送异步请求
    const result = await reqAddress(longitude, latitude)
    // console.log(result)
    // 2.请求成功后,提交给mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  // 获取商品分类数组的异步action  不一定有状态state(由接口函数是否需要来确定)
  async getCategorys ({ commit }) {
    // 1.发送异步请求
    const result = await reqCategorys()
    // 2.请求成功后,提交给mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },

  // 获取商家数组的异步action  不一定有状态state(由接口函数是否需要来确定)
  async getShops ({ commit, state }) {
    const { longitude, latitude } = state
    // 1.发送异步请求
    const result = await reqShops(longitude, latitude)
    // 2.请求成功后,提交给mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  }

}