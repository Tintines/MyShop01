<template>
    <section class="msite">
        <!-- 首页头部 -->
        <Header :title="address.name || '定位中...'">
            <span class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </span>
            <span class="header_search" slot="left">
                <i class="iconfont icon-sousuo"></i>
            </span>
        </Header>
        <!-- 首页导航 -->
        <nav class="msite_nav">
            <div ref="sc1" class="swiper-container">
                <div class="swiper-wrapper" v-if="categorysArr1.length>0">
                    <!-- 几个swiper-slide对应几个页面和分页器 -->
                    <div class="swiper-slide" v-for="(cs, index) in categorysArr2" :key="index">
                        <div class="link_to_food" v-for="(c, index) in cs" :key="index">
                            <div class="food_container">
                                <img :src="`https://fuss10.elemecdn.com${c.image_url}`">
                            </div>
                            <span>{{c.title}}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="msite_back_img">
                    <img src="./images/msite_back.svg">
                </div>
                <!-- 分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <!-- 首页附近商家 -->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <div class="shop_container">
                <ul class="shop_list" v-if="shops.length>0">
                    <li class="shop_li border-1px" v-for="shop in shops" :key="shop.id">
                        <a>
                            <div class="shop_left">
                                <img :src="`https://fuss10.elemecdn.com${shop.image_path}`" alt="" class="shop_img">
                            </div>
                            <div class="shop_right">
                                <section class="shop_detail_header">
                                    <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                                    <ul class="shop_detail_ul">
                                        <li class="supports" v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</li>

                                    </ul>
                                </section>
                                <section class="shop_rating_order">
                                    <section class="shop_rating_order_left">
                                        <!-- Star -->
                                        <Star :score="shop.rating" :size="24"/>
                                        <div class="rating_section">
                                            {{shop.rating}}
                                        </div>
                                        <div class="order_section">
                                            月售{{shop.recent_order_num}}单
                                        </div>
                                    </section>
                                    <section class="shop_rating_order_right">
                                        <span class="delivery_style delivery_left">{{shop.delivery_mode.text}}</span>
                                        <span class="delivery_style delivery_right">过时退</span>
                                    </section>
                                </section>
                                <section class="shop_distance">
                                    <p class="shop_delivery_msg">
                                        <span>¥{{shop.float_minimum_order_amount}}起送</span>
                                        <span class="segmentation">/</span>
                                        <span>配送费约¥{{shop.float_delivery_fee}}</span>
                                    </p>
                                </section>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- 无数据时显示加载图 -->
                <ul v-else>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
// import _ from 'lodash'  //全部引入,体积过大
import chunk from 'lodash/chunk' // 只打包引入的工具函数 ==>打包文件更小
import Star from '../../components/Star/Star.vue'

export default {
  components: { Star },
  computed: {
    ...mapState(['address', 'categorys', 'shops']),

    /**
     * 根据一维数组生成二维数组
     * 包含所有分类的二维数组
     * 内部小数组的长度最大是8
     */
    // 自定义函数实现二维数组
    categorysArr1 () {
      const { categorys } = this
      // 定义二维数组
      const bigArr = []
      let smallArr = []

      // 遍历一维数组
      categorys.forEach(c => {
        // 将小数组保存到大数组中(只在第一次事存进去且只保存一次,此后只对小数组进行遍历push添加,此时可以保证大数组内只有一个小数组类似[[0,1,2]])
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }

        // 将c保存到小数组中
        smallArr.push(c)
        // 小数组的长度最大是8  ==> 如果小数组满, 创建一个新的小数组(下次执行时smallArr.length为0,则执行上面向父亲中添加第二次小数组类似[[...],[...]])
        if (smallArr.length === 8) {
          smallArr = []
        }
      })

      // 返回二维数组
      return bigArr
    },

    // 使用第三方库实现二维数组
    categorysArr2 () {
      // return _.chunk(this.categorys, 8)  //非按需引入
      return chunk(this.categorys, 8) // 按需引入
    }
  },

  // swiper对象必须要在列表数据显示之后创建  添加以下一行绕过规则检测
  async mounted () {
    // 分发异步action,将数据从后台请求到vuex中
    // 前期需要去服务器端关一下请求后端路由时的权限验证

    // 方式2: callback + nextTick()  此方法要修改actions,是可以传回调函数
    /* this.$store.dispatch('getCategorys', ()=>{  //数据已经变了
      this.$nextTick(()=>{
          // swiper对象必须要在列表数据显示之后创建
          new Swiper (this.$refs.sc1, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
      })
    }) */
    this.$store.dispatch('getShops')
    this.$store.dispatch('getAddress')

    // 方式3: 利用dipatch()返回的promise 配合async await 代码最简洁,小细节:因为是异步发送所以要放到发送发送数据方法最后再发送
    await this.$store.dispatch('getCategorys') // dispatch返回的promise在数据更新且界面更新之后才成功

    // swiper对象必须要在列表数据显示之后创建
    new Swiper('.swiper-container', {   // eslint-disable-line
      loop: true, // 循环模式选项
      pagination: { // 如果需要分页器
        el: '.swiper-pagination'
      }
    })
  },

  /*
    解决swiper轮播不正常的问题?
    方式1: watch + nextTick()
    方式2: callback + nextTick()
    方式3: 利用dipatch()返回的promise
    */

  // 方式1: watch + nextTick()
  watch: { // 非深度监视,只监视到了数据变化,界面此时是否变化不确定
    /**
        * 1.更新数据
        * 2.立即同步调用监视回调函数
        * 3.异步更新界面
        *  */
    /* categorys () {   // categorys初始数据赋值的变化,此时界面不一定变化: [] ==> [...]
        //$nextTick()将回调延迟到下次DOM更新循环后执行.在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(()=>{
            // swiper对象必须要在列表数据显示之后创建
            //new Swiper('.swiper-container', {   // eslint-disable-line
            new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            pagination: { // 如果需要分页器
                el: '.swiper-pagination'
            }
            })
        })
        } */
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background-color #ffffff
            .swiper-container
                --swiper-pagination-color #02a774  //设置导航点颜色
                width 100%
                height 100%
                overflow hidden
                .msite_back_img
                    >img
                        margin-top 30px
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            padding-top 10px
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0 //处理换行后的空格产生的空隙
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666666
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background-color #ffffff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    margin-left 5px
                    color #999
                    font-size 14px
                    line-height 20px
            .shop_container
                margin-bottom 50px
                .shop_list
                    .shop_li
                        bottom-border-1px(#f1f1f1)
                        width 100%
                        >a
                            clearFix()
                            display block
                            box-sizing border-box
                            padding 15px 8px
                            width 100%
                            .shop_left
                                float left
                                box-sizing border-box
                                width 23%
                                height 75px
                                padding-right 10px
                                .shop_img
                                    display block
                                    width 100%
                                    height 100%
                            .shop_right
                                float right
                                width 77%
                                .shop_detail_header
                                    clearFix()
                                    width 100%
                                    .shop_title
                                        float left
                                        width 200px
                                        color #333
                                        font-size 16px
                                        line-height 16px
                                        font-weight 700
                                        &::before
                                            content '品牌'
                                            display inline-block
                                            font-size 11px
                                            line-height 11px
                                            color #333
                                            background-color #ffd930
                                            padding 2px 2px
                                            border-radius 2px
                                            margin-right 5px
                                    .shop_detail_ul
                                        float right
                                        margin-top 3px
                                        .supports
                                            float left
                                            font-size 10px
                                            color #999
                                            border 1px solid #f1f1f1
                                            padding 0 2px
                                            border-radius 2px
                                .shop_rating_order
                                    clearFix()
                                    width 100%
                                    margin-top 18px
                                    margin-bottom 8px
                                    .shop_rating_order_left
                                        float left
                                        color #ff9a0d
                                        // Star
                                        .rating_section
                                            float left
                                            font-size 14px
                                            color #ff6000
                                            margin-left 4px
                                            margin-top 1px
                                        .order_section
                                            margin-top 2px
                                            float left
                                            font-size 12px
                                            color #666
                                            transform scale(.8)
                                    .shop_rating_order_right
                                        float right
                                        font-size 0
                                        .delivery_style
                                            transform scale(.7)
                                            display inline-block
                                            font-size 12px
                                            padding 1px
                                            border-radius 2px
                                            &.delivery_left
                                                font-size 12px
                                                color #fff
                                                margin-right -10px
                                                background-color #02a774
                                                border 1px solid #02a774
                                .shop_distance
                                    clearFix()
                                    width 100%
                                    font-size 12px
                                    .shop_delivery_msg
                                        float left
                                        transform-origin 0
                                        transform scale(.9)
                                        color #666
                                    .segmentation
                                        color #ccc

</style>
