import { Class } from 'type-fest'
import { ICommandData } from '../../typings'
import BaseCommand from './BaseCommand'

const command: (data: ICommandData) => (Target: Class<BaseCommand>) => any = (
    data: ICommandData
) => {
    let main = (Target: Class<BaseCommand>) => {
        return class extends Target {
            constructor(...args: any[]) {
                super(data, undefined, true, ...args)
            }
        }
    }

    return main
}

export default command
