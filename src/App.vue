<template>
    <div>
        <router-view></router-view>
        <!-- 路由源信息 -->
        <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
    </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
// import { reqAddress } from '@/api'
export default {
  // 最原始直接调用api测试接口
  // async mounted () {
  //     const result = await reqAddress('40.10038','116.36867') //传入字符串
  //     console.log('result', result);
  // },
  async mounted () {
    // 通知actions异步获取address并保存到state
    this.$store.dispatch('getAddress')
  },
  // 引入并局部注册FooterGuide组件
  components: {
    FooterGuide
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
