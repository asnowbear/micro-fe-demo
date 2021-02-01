import http from './http'
// import { subApps } from './app-data'

const getAppConfigsApi = () => http.get({
  url: 'Api/GetAppConfigs',
})

export {
  getAppConfigsApi
}