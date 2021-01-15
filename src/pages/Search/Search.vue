<template>
    <section class="search">
        <Header title="搜 索"></Header>
        <form action="#" class="search_form">
            <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
            <input type="submit" name="submit" class="search_submit">
        </form>
    </section>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    .search_form
        margin-top 45px
        background-color #ffffff
        padding 12px 8px
        clearFix()  //儿子浮动后父亲高度丢失
        input
            height 35px
            padding 0 4px
            border-radius 2px
            font-weight bold
            outline none
            &.search_input
                float left
                width 79%
                border 4px solid #f2f2f2
                font-size 14px
                color #ccc
                background-color #f2f2f2
            &.search_submit
                float right
                width 18%
                border 4px solid #02a774
                font-size 16px
                color #ffffff
                background-color #02a774

</style>
