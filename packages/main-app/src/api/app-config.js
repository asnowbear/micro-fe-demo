import http from './http'
import { subApps } from './app-data'

// const getAppConfigsApi = () => http.get({
//   url: 'Api/GetAppConfigs',
// })

// const getAppConfigsApi = () => http.get({
//   url: 'Api/GetAppConfigs',
// })

const getAppConfigsApi = () => {
  return Promise((resolve, reject) => {
    resolve(subApps)
  })
}








export {
  getAppConfigsApi
}