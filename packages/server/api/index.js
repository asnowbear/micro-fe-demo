const Router = require('koa-router')
const appConfigs = require('./main/app-config.js')
const login = require('./login')

const router = new Router()

router.use(appConfigs.routes(), appConfigs.allowedMethods())
router.use(login.routes(), login.allowedMethods())

module.exports = router
