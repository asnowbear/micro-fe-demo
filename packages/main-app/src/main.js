/**
 * @name 统一注册外部插件、样式、服务等
 */
import './core/install'

// 实例化Vue，并挂载
import './core/render'

/**
 * @name 验证登陆身份并启动微应用
 */
import microAppStart from './core/auth'
microAppStart()