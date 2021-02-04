const fs = require('fs')
const path = require('path')
const util = require('util')
const child_process = require('child_process')
const inquirer = require('inquirer') // 用于命令交互
const log = require('utils/log')
const app_path = path.resolve('package')
const sub_apps_name = fs.readdirSync(app_path).filter( i => /^server|main-app|subapp/.test(i))
const maxBufferLength = 2000 * 1024
const __c = console.log

const exec = util.promisify(child_process.exec)

const question = [
    {
        type: 'checkbox',
        name: 'apps',
        message: '请选择哟啊启动的模块（按a全选，按回车直接运行全部）',
        choices: sub_apps_name,
    }
]

inquirer.prompt(question).then( async (answer) => {
    const sub_apps_ = answer.apps.length ? answer.apps: sub_apps
    start(sub_apps_)
} )


function start(sub_apps_) {
    log.green(`即将进入模块并启动服务:${JSON.stringify(sub_apps_)} ing...`)

    sub_apps_.forEach( async ii => {
        const i = `packages/${ii}`
        if (!fs.existsSync(`${i}/package.json`)) {
            log.red(`${i} 应用缺少package.json，将跳出此应用`)
            return false;
        }

        if (!fs.existsSync(`${i}/node_modules`)) {
            log.red(`${i}应用未检测到node_modules目录，将跳过此应用`)
            return false;
        }

        const packageJson = fs.readFileSync(`${i}/package.json`).toString()
        const packageData = JSON.parse(packageJson)
        log.cyan(`${i}开始启动...端口：${packageData.port} 全部启动需要时间，请稍加等候，或刷新浏览器即可`)
        await exec('yarn serve', { cwd: path.resolve(i), maxBuffer: maxBufferLength })
    })

    const packageJson = fs.readFileSync('packages/main-app/package.json')
    const packageData = JSON.parse(packageJson)
    exec('start http://localhost:' + packageData.port)
}

process.on('unhandledRejection', (reason, p) => {
    __c('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

