
import store from "../store";

import { DataType } from "wl-core"

import { getStorageToken } from "@/utils/user-vali"

import { getAppConfigsApi } from '@/api/app-config'

import { myMessage } from '@/plugins/element'

/**
 * 导入qiankun注册微应用方法
 */
import qianKunStart from './app-register'

/**
 * 导入无需服务端获取的微应用
 */
import noAuthApps from "./app-config"

const getAppConfigs = () => {
  getAppConfigsApi().then(({ data }) => {
    // 验证请求错误
    if (data.code !== 200) {
      myMessage({
        type: 'error',
        message: "请求错误"
      })
      return;
    }
    // 验证数据有效性
    let _res = data.data || [];
    if (_res.length === 0) {
      myMessage({
        type: 'error',
        message: "没有可以注册的子应用数据"
      })
      return;
    }

    // 处理菜单状态共享
    let _menu = [];
    _res.forEach(i => {
      if (DataType.isArray(i.data)) _menu.push(...i.data)
    })
    store.dispatch('menu/setMenu', _menu);
    /**
     * @name 启用qiankun微前端应用，已启动过用手动加载，未启动过正常注册
     */
    qianKunStart(_res);
  })
}

const microAppStart = () => {
  const token = getStorageToken();
  /**
   * @name 已登录状态获取服务端微应用注册表
   */
  if (token) {
    // 处理token状态共享
    store.dispatch('app/setToken', token);
    getAppConfigs();
    return;
  }
  /**
   * @name 默认加载未登录时无需服务端获取的微应用
   */
  qianKunStart(noAuthApps)
}

export default microAppStart
