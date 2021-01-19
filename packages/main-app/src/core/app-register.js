import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState
} from "qiankun"

import store from '../store'

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
  
}