import { IEventData } from '../../typings/IEvent'
import { Class } from 'type-fest'
import BaseEvent from './BaseEvent'

const event = (data: IEventData) => {
    let main = (Target: Class<BaseEvent>) => {
        return class extends Target {
            constructor(...args: any[]) {
                super(data, ...args)
            }
        }
    }

    return main
}

export default event