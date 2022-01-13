import { LTNClient } from '../client'

export interface IEventData {
    name: string
    once?: boolean
}

export interface IEventExec {
    (client: LTNClient, ...args: string[]): any
}

export default interface IEvent {
    data: IEventData
    exec: IEventExec
}
