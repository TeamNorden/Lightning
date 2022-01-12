import { Client } from 'revolt.js'
import { Message } from 'revolt.js/dist/maps/Messages'

export interface ICommandData {
    name: string,
    description?: string,
    aliases: string | string[],
    category: string
    devOnly?: boolean,
}

export interface ICommandExec {
    (client: Client, message: Message, args: string[]): any
}

export default interface ICommand {
    data: ICommandData
    exec: ICommandExec
}