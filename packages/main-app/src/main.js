/**
 * @name 统一注册外部插件、样式、服务等
 */
import './core/install'

import './core/render'

/**
 * @name 验证登陆身份并启动微应用
 */
import microAppStart from './core/auth'
microAppStart()