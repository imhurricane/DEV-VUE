// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import { initRouter } from '@/libs/router-util' // ①新增  引入动态菜单渲染
import msgContent from '@/libs/reutrnMsgContent'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import { directive as clickOutside } from 'v-click-outside-x'

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_npm run dev
// ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value),
})
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

Vue.prototype.MSGCONTENT = msgContent
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  mounted() {
    initRouter(this);  // ①新增 调用方法,动态生成路由
  }
})
