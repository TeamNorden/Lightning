import LTNLogger from '../modules/utils/Logger'
import { Class } from 'type-fest'
import { LTNLoggerOptions } from './LoggerOptions'

export enum Strictness {
    'HIGH',
    'MODERATE',
    'LOW'
}

export type StructureType = 'OBJECT' | 'DECORATOR' | 'CLASS'

export interface IClientConfig {
    structureType: StructureType
    typescript: boolean
    strictness?: Strictness
}

export interface IClientLoggerOptions {
    class?: Class<LTNLogger>
    options?: LTNLoggerOptions
}

export interface IClientOptions {
    commandsDir: string
    eventsDir: string
    config: IClientConfig
    logger?: IClientLoggerOptions
}
