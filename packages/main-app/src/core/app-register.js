import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState
} from "qiankun"

import store from '../store'

import emits from "../utils/emit"

import appStore from './app-store'

import GLOBAL from '@/global'

const appContainer = '#subapp-viewport'

let props = {
  data: store.getters,
  emits,
  GLOBAL
}

const qianKunStart = (list) => {
  let apps = []
  let defaultApp = null
  let isDev = process.env.NODE_ENV  === 'development'
  list.forEach( i => {
    apps.push({
      name: i.module,
      entry: isDev ? i.devEntry : i.depEntry,
      container: appContainer,
      activeRule: i.routerBase,
      props: { ...props, routes: i.data, routerBase: i.routerBase }
    })
    if (i.defaultRegister) {
        defaultApp = i.routerBase
    }
  })

  registerMicroApps(
    apps,
    {
      beforeLoad: [
        app => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
      ],
      beforeMount: [
        app => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
      ],
      afterUnmount: [
        app => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
      ],
    },
  )

//   console.log('sdfdsfd', defaultApp + '/')

  /**
   * @name 设置默认进入的子应用
   * @param {String} 需要进入的子应用路由前缀
   */
  setDefaultMountApp(defaultApp + '/');

  /**
   * @name 启动微前端
   */
  start();

  /**
   * @name 微前端启动进入第一个子应用后回调函数
   */
  runAfterFirstMounted(() => { });

  /**
 * @name 启动qiankun应用间通信机制
 */
  appStore(initGlobalState);
}

export default qianKunStart;
