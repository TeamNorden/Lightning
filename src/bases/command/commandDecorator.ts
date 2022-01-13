import { Class } from 'type-fest'
import { ICommandData } from '../../typings/ICommand'
import BaseCommand from './BaseCommand'

const command = (data: ICommandData) => {
    let main = (Target: Class<BaseCommand>) => {
        return class extends Target {
            constructor(...args: any[]) {
                super(data, ...args)
            }
        }
    }

    return main
}

export default command
