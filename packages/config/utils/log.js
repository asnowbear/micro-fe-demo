const chalk = require('chalk')

const log = {
    red(...lines) {
        lines.forEach(line => {
            this._log(chalk.red(line))
        })
    },

    blue(...lines) {
        lines.forEach(line => {
            this._log(chalk.blue(line))
        })
    },

    green(...lines) {
        lines.forEach(line => {
            this._log(chalk.green(line))
        })
    },

    cyan(...lines) {
        lines.forEach(line => {
            this._log(chalk.cyan(line))
        })
    },

    error(...lines) {
        lines.forEach(line => {
            this._log(chalk.error(line))
        })
    },

    _log(line) {
        if (line instanceof Object) {
            line = JSON.stringify(line)
        }
        console.log(line + '\n')
    }
}

module.exports = { log } 