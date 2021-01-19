import Http from "wl-http"
import { Storage } from "wl-core"
import global from "@/global"
import { Message } from "element-ui"

const options = {
  axiosOptions: {
    baseURL: 'http://localhost:3700/'
  },
  requestInterceptorSuccessCb: config => {
    let token = Storage.get('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  responseInterceptorSuccessCb: res => {
    if ( res.data.code === global.code.err ) {
      Message({
        showClose: true,
        message: res?.data?.message || '操作失败',
        type: 'error'
      })
    }
    return res
  },
  responseInterceptorErrorCb: err => err,
}

const http = new Http(options)
export default http