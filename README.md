# myshop-client

```
Only action can change my destiny.
```

## 2020-12-06

### 目标：安装vue3的脚手架并配置好相关配置，启动项目第一天的内容

```
1、已全局安装好vue,查看版本号终端  vue --version
当前脚手架安装版本 @vue/cli 4.5.9
2、创建当前vue3的项目，终端  vue create myshop-client ,前期学的vue2，所以选择手动配置相关脚手架内容。保存自定义配置起名为 my vue2/cli
3、启动项目查看脚手架是否配置成功
4、试着按教程修改，报错，挣扎半小时，原来是原先给定的router store在初始化就存在下，被我禁用的同时，未相应的在调用模块中禁用，导致的not defined报错
```

## 2020-12-07

### 适配模块安装依赖到生产依赖

`
yarn add postcss-px2rem  lib-flexible 
`

#### 配置说明

```
在项目入口文件 main.js 里 引入 lib-flexible， flexible会自动根据设备情况动态设置rem的值的大小
```

```
在vue.config.js中添加配置
      const px2rem = require('postcss-px2rem')
      // 配置postcs-px2rem
      const postcss = px2rem({
        remUnit: 37.5   //基准大小 baseSize，需要和rem.js中单位rem值占比一样相同
      })
      css: { // 添加postcss配置
          loaderOptions: {
            postcss: {
              plugins: [
                postcss
              ]
            }
          }
      },
```

### git托管项目

常用命令

```
 mkdir XX：创建一个空目录 XX指目录名
 pwd：显示当前目录的路径
 cat xx：查看xx文件内容
 git init：把当前的目录变成可以管理的git仓库，生成隐藏的.git文件夹
 git add xx：把xx文件添加到暂存区
 git commit -m “xx”：提交文件 -m后面的是注释，必须写！
 git status：查看仓库状态
 git log：查看历史记录
 git reset --hard HEAD^：往上回退一个版本
 git reflog：查看历史记录的版本号id
 git checkout -- xx：把xx文件在工作区的修改全部撤销
 git rm xx：删除xx文件
 git remote add origin https://github.com/xxxxx/a.git 关联一个远程库
 git push -u（第一次尽量加上-u，以后不用）origin master：把当前master分支推送到远程库
 git clone https://github.com/xxxxx   从远程库中克隆
 git checkout -b dev：创建dev分支 并切换到dev分支上
 git branch：查看当前所有的分支
 git checkout master：切换回master分支
 git merge dev：在当前分支合并dev分支
 git branch -d dev：删除dev分支
 git branch xxx：创建分支xxx
 git remote：查看远程库信息
 git remote -v查看远程库的详细信息
 git pull origin master 将远程库的更新拉取到本地并自动合并
 git push origin master：git会把master分支推送到远程库对应的分支上
```

## 2020-12-07

### 1.配置 Vue 3 Snippets 的vue组件基础模版

```
{
	"vue component file": {
		"prefix": "vue",
		"body": [
			"<template>",
				"<div>\n\n",
				"</div>",
			"</template>\n",
		
			"<script type=\"text/ecmascript-6\">",
				"export default {\n\n",
		
				"}",
			"</script>\n",
		
			"<style scoped lang=\"stylus\" rel=\"stylesheet/stylus\">\n\n",
			
			"</style>",
			"$2"
		],
		"description": "vue组件文件"
	},
}
```

  设置viewport

```
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

### 解决点击响应0.3s延时问题

```
在head标签中添加
<script src="https://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
    <script>
      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
    </script>
```

## 搭建基础目录结构及文件

```
src
	|-- components------------非路由组件文件夹
		|-- FooterGuide---------------底部组件文件夹
			|-- FooterGuide.vue--------底部组件vue
  |-- pages-----------------路由组件文件夹
		|-- Msite---------------首页组件文件夹
			|-- Msite.vue--------首页组件vue
		|-- Search----------------搜索组件文件夹
			|-- Search.vue---------搜索组件vue
		|-- Order--------------订单组件文件夹
			|-- Order.vue-------订单组件vue
		|-- Profile--------------个人组件文件夹
			|-- Profile.vue-------个人组件vue
  |-- router-----------------路由器文件夹
  |-- vuex-----------------vuex管理状态文件夹
	|-- App.vue---------------应用根组件vue
	|-- main.js---------------应用入口js
```

## 2.引入vue-router

### 下载vue-router

```
yarn add vue-router
```

### 创建router入口js文件

```
index.js
/**
 * 向外暴露路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入分开的路由数组文件
import routes from './routes'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
    //使用history模式：路由路径没有#
    mode: 'history',

    // 注册项目中的所有路由
    // 将路由数组分开写
    routes   
})

routes.js
略
```

### 在主入口js文件中引入路由器模块

```
import router from './router'

new Vue({

  render: h => h(App),
  router, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
  store, // 所有组件都能看到: $store
}).$mount('#app')

```

### 在主文件vue中引入页面并注册相关组件

```
<template>
  <div>
    <!-- 添加路由显示标签 -->
    <router-view></router-view>
    <!-- 添加FooterGuide组件 -->
    <FooterGuide></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'

  // 引入并局部注册FooterGuide组件
  export default {
    components: {
      FooterGuide
    }
  }
</script>
```

### 在路由数组文件中设置默认跳转页面

```
{
        path: '/',
        redirect: '/msite'
      }
```

### 启动项目手动输入路由地址进行测试

## 2.1 编写底部导航组件FooterGuide

解决点击同一个底部选项报错,再点击时的组件内

```
methods: {
       
        goto (path) {
            // 方案一：如果点击当前项，没有任务效果
            // 且双击会报错
            // if (path!==this.$route.path) {
            //     // 编程式路由跳转
            //     this.$router.replace(path)
            // }

            // 方案二：如果点击当前项，刷新界面
            if (path!==this.$route.path) {
                // 编程式路由跳转
                this.$router.replace(path)
            } else {
                window.location = path
            }
        }
    }
```

### 2.2使用swiper实现图片轮播

地址: http://www.swiper.com.cn/
下载练习准确版本: 

```
yarn add swiper@5.2.1
```

配置

```
<script type="text/ecmascript-6">
    import Swiper from 'swiper'
    import 'swiper/css/swiper.css'
    // import 'swiper/swiper-bundle.css' //高级swiper    

export default {
    mounted () {
        // swiper对象必须要在列表数据显示之后创建
        new Swiper ('.swiper-container', {
            loop: true, //循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            }
        })
       
    }  
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper-container   
    --swiper-pagination-color: #02a774  //设置导航点颜色
</style>

```


### 开启eslint检测后提示new对象错误

Do not use 'new' for side effects

方法一

在错误地方上加/ eslint-disable no-new /绕过规则检测

```
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

方法二

替代用法

```
let vm = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

Vue.use({
  vm
})
```
重点!!!修改后必须重新1.先提交暂存区2.再提交到工作区

## 2.3 使用postman测试接口

## 2.4 封装axios
```
yarn add axios
```
写api文件夹

## 2.5 使用vuex管理状态
```
yarn add vuex
```
写vuex文件夹

## 3.动态更新页面
### 3.1 MSite
1.异步显示当前地址
2.异步显示商家列表
  设置空状态占位图
3.异步显示商品分类
  设置空状态占位图

### 3.2 工具库lodash
别的组件库包含的lodash,不需要再次下载

### 3.3 mintui使用及按需加载
设置数据到之前的loading动画,要在ajax中的拦截器中分别设置开启和关闭
```
yarn add mint-ui

下载编译插件  开发环境
yarn add babel-plugin-component -D

添加配置babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['component', {
      "libraryName": "mint-ui", // 针对mint-ui库实现按需引入打包
      "style": true // 自动打包对应的css
    }]
  ]
}

```
### 3.1 Login页面
1). 一次性图形验证码
        通过<img src="url">请求后台获取验证码图片显示
        点击回调中更新img的src, 并携带时间戳参数, 更新验证码
    2). 一次性短信验证码
        使用第三方短信平台(容联)接口
            注册/登陆
            添加测试号码
            修改账号ID/Token/AppID
            重新运行最终版的后台和前台应用
        请求发送验证码短信
        使用mint-ui实现对不同结果的不同提示效果
    3).  手机号/验证码登陆
    4). 用户名/密码/验证码登陆
        发送ajax请求, 得到返回的结果
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0: 成功, 保存user到state, 保存token到storage, 返回到个人中心

### 3.2 修改输入框获取焦点及placeholder样式
```
input
  &:focus
      border 1px solid #02a774
  &::placeholder  //修改 **placeholder** 样式
      color #ccc
```
### 3.3 修改输入框获取焦点时清空placeholder
```
<input type="tel" maxlength="11" placeholder="手机号" v-model="phone" onfocus="this.placeholder=''" onblur="this.placeholder='手机号'">

```
## 4.动态更新login页面

### 4.1 容联云使用
发送真实短信
https://www.yuntongxun.com/?ly=baidu-pz-p&qd=cpc&cp=ppc&xl=null&kw=10360228

配置服务器
参照自己账户的信息
util 文件夹
修改ACCOUNT_SID   AUTH_TOKEN    AppID

### 4.2 vee-validate表单验证  第三方库
```
下载: yarn add vee-validate@2.2.15
    引入插件:
        import Vue from 'vue'
        import VeeValidate from 'vee-validate'
        
        Vue.use(VeeValidate)
```





