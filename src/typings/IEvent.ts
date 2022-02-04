import { LTNClient } from '../client'
import { Message } from 'revolt.js/dist/maps/Messages'

export interface IEventData {
    name: string
    once?: boolean
}

export interface IEventExec {
    (client: LTNClient, ...args: string[]): any
}

export interface IClassBasedEventExec {
    (message: Message, args: string[]): any
}

export interface IEvent {
    data: IEventData
    exec: IEventExec | IClassBasedEventExec
}
