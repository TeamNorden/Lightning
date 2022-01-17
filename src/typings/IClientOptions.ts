import LTNLogger from '../modules/utils/Logger'
import { Class } from 'type-fest'
import { LTNLoggerOptions } from './LoggerOptions'
import { Message } from 'revolt.js/dist/maps/Messages'
import { LTNClient } from '../client'

export enum Strictness {
    'HIGH',
    'MODERATE',
    'LOW'
}

export type StructureType = 'OBJECT' | 'DECORATOR' | 'CLASS'

export interface IClientConfig {
    prefix?: string
    structureType: StructureType
    typescript: boolean
    strictness?: Strictness
    messageHandler?:
        | ((client: LTNClient, message: Message, args?: string[]) => any)
        | 'DEFAULT'
        | 'NONE'
}

export interface IClientLoggerOptions {
    class?: Class<LTNLogger>
    options?: LTNLoggerOptions
}

export interface IClientDBOptions {
    uri: string
    caching?: boolean
    typegoose?: boolean
}

export interface IClientOptions {
    commandsDir: string
    eventsDir: string
    config: IClientConfig
    logger?: IClientLoggerOptions
    database?: IClientDBOptions
}
