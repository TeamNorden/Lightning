import { Message } from 'revolt.js/dist/maps/Messages'
import { LTNClient } from '../client'

export interface ICommandGuard {
    name: string
    check: (message: Message) => boolean
}

export interface ICommandData {
    name: string
    description?: string
    aliases: string | string[]
    category: string
    devOnly?: boolean
}

export interface ICommandExec {
    (client: LTNClient, message: Message, args: string[]): any
}

export interface ICommand {
    data: ICommandData & { [key: ICommandGuard['name']]: boolean }
    exec: ICommandExec
}
