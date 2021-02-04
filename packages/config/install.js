const fs = require('fs')
const path = require('path')
const util = require('util')
const { log } = require('./utils/log')
// 当前命令执行目录+"/packages"
const sub_app_path = path.resolve("packages")
__c = console.log
const jpm = process.argv[2]

__c('应用目录:', sub_app_path)
__c('node 包管理名称', jpm)

const sub_apps = fs
    .readdirSync(sub_app_path)
    .filter(i => /^server|main-app|subapp/.test(i))

const inquirer = require('inquirer')

// promisify方法让对象具备promise特性
/**
 *  child_process.exec(command[,options][,callback])
 *  command <string> 要运行的命令，参数使用空格分隔。
 *  options <Object>
 *  cwd <string> 子进程的当前工作目录。 默认值: null。
 */
const exec = util.promisify(require('child_process').exec)

const q = [
    {
        type: 'checkbox',
        name: 'apps',
        message: '请选择要install的模块(按a全选，按回车直接install全部)',
        choices: sub_apps
    },
    {
        type: 'list',
        name: 'skip',
        message: '是否跳过已经存在的node_modules的应用',
        choices: ['yes', 'no']
    }
]

inquirer.prompt(q).then(async (answer) => {
    const sub_apps_ = answer.apps.length ? answer.apps : sub_apps
    const npm = jpm + ' install'
    const skip = answer.skip
    install(sub_apps_, npm, skip)
})

function install(sub_apps_, npm, skip) {
    log.red(`即将进入模块并下载依赖:${JSON.stringify(sub_apps_)} ing...`)
    sub_apps_.forEach( ii => {
        const i = `packages/${ii}`
        if (!fs.existsSync(`${i}/package.json`)) {
            log.red(`${i}应用缺少package.json文件，将跳过此应用`)
            return false
        }

        if (fs.existsSync(`${i}/node_modules` && skip)) {
            log.green(`${i}应用以及检测到node_modules目录，将跳过此应用`)
            return false
        }

        log.red(`${i} 开始下载，耗时较久请耐心等待...`)
        // log.red('path.resolve(i)】】',path.resolve(i) )
        const { stdout, stderr } =  exec(npm, { cwd: path.resolve(i)});
        log.cyan(i, 'success', stdout)
        log.red(i, 'error', stderr)
    })
}

process.on('unhandleRejection', (reason, p) => {
    console.log('Unhandle Rejection at: Promise', p, 'reason:', reason)
})
