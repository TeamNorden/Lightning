import chalk from "chalk"
import { LTNLoggerOptions, LTNLoggerType } from '../../typings/LoggerOptions'

class LTNLogger {
    public colours: LTNLoggerOptions

    constructor(options: LTNLoggerOptions) {
        this.colours = {
            primary: options.primary,
            secondary: options.secondary,
            LOGIN: options.READY ?? options.primary,
            READY: options.READY ?? options.primary,
            LOAD: options.LOAD ?? [66, 215, 245],
            COMMAND: options.COMMAND ?? [250, 169, 70],
            EVENT: options.EVENT ?? [5, 247, 82],
            ERROR: options.ERROR ?? [0, 0, 255],
            WARN: options.WARN ?? [255, 174, 0],
            DATABASE: options.DATABASE ?? [77, 179, 61],
        }
    }

    public log = (type: LTNLoggerType, message: any, tab?: boolean, newLineBefore?: boolean) => {
        let colourOfType = this.colours[type.toLowerCase() as keyof LTNLoggerOptions]!

        let chalkColour = chalk.rgb(...colourOfType)

        let typeTitle = chalkColour(type.trim().split(/(?=[A-Z])/).join('_').toUpperCase())

        if (['READY', 'LOGIN'].includes(type)) {
            chalkColour = chalk.rgb(...this.colours.secondary).bgRgb(...colourOfType)
        }

        let data = (newLineBefore ? '\n' : '') + (tab ? '\t' : '') + '[' + typeTitle + '] ' + chalkColour(message)

        console.log(data)
    }

    public error = (err: any, errType?: LTNLoggerType) => {
        let errColourArray = this.colours.ERROR!
        let errColour = chalk.rgb(...errColourArray)

        let data = '[' + errColour(errType ? (errType.toUpperCase() + '_ERR') : 'ERR') + '] ' + errColour(err)

        console.log(data)
    }

    public warn = (err: any, warnType?: LTNLoggerType) => {
        let warnColourArray = this.colours.WARN!
        let warnColour = chalk.rgb(...warnColourArray)

        let data = '[' + warnColour(warnType ? (warnType.toUpperCase() + '_WARN') : 'WARN') + '] ' + warnColour(err)

        console.log(data)
    }
}

export default LTNLogger