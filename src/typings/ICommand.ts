import { Message } from 'revolt.js/dist/maps/Messages'
import { LTNClient } from '../client'

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

export default interface ICommand {
    data: ICommandData
    exec: ICommandExec
}
