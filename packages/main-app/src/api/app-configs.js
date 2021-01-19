import http from './http'

const getAppConfigApi = () => http.get({
  url: 'Api/GetAppConfigs',
})

export {
  getAppConfigApi
}