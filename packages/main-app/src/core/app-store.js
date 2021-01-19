import store from '@/store'

const appStore = (initGlobalState) => {

  /**
   * 初始化
   */
  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    msg: '',
    token: '',
    appsRefresh: false,
  })

  /**
   * 监听数据变化
   */
  onGlobalStateChange((value, prev) => {
    'msg' in value && store.dispatch('appstore/setMsg', value.msg);
    value.token && store.dispatch('app/setToken', value.token);
    value.appsRefresh && window?.location?.reload?.();
  })

  /**
   * 广播所有应用
   */
  setGlobalState({
    ignore: 'master',
    msg: '来自master动态设定的消息'
  })
}

export default appStore
