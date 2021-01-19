<template>
    <div class="star star-24">
        <span class="star-item" v-for="(item, index) in starClasses" :key="index" :class="item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    score: Number, // 评分
    size: Number // 尺寸
  },

  computed: {
    // 计算星星显示数组由评分决定
    starClasses () {
      const { score } = this
      const arr = []

      //  向arr中添加n个'on'
      const scoreInteger = Math.floor(score)
      for (let index = 0; index < scoreInteger; index++) {
        arr.push('on')
      }

      //  向arr中添加0/1个'half'
      if (score - scoreInteger > 0) {
        arr.push('half')
      }

      //  向arr中添加n个'off' 此处使用while !!!使用if时只会进入一次,不会连续进行判断
      while (arr.length < 5) {
        arr.push('off')
      }

      return arr
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'  //拆拿过来后忘记把引入的混合文件引入
    .star   //2x图 3x图
        float left
        font-size 0
        .star-item
            display inline-block
            background-repeat no-repeat
        &.star-24
            .star-item
                width 14px
                height 14px
                margin-right 2px
                background-size 14px 14px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./stars/star48_on')
                &.half
                    bg-image('./stars/star48_half')
                &.off
                    bg-image('./stars/star48_off')
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('./stars/star48_on')
                &.half
                    bg-image('./stars/star48_half')
                &.off
                    bg-image('./stars/star48_off')
        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size 15px 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./stars/star36_on')
                &.half
                    bg-image('./stars/star36_half')
                &.off
                    bg-image('./stars/star36_off')
</style>
