import { Storage } from 'wl-core'
import SETTING from '@/setting'

/**
 * @name 浏览器本地存储是否有用户的登陆信息
 */
const getStorageToken = () => {
  return Storage.get(SETTING.tokenKey)
}

export {
  getStorageToken
}

