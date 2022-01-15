enum Strictness {
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

export default interface IClientOptions {
    commandsDir: string
    eventsDir: string
    config: IClientConfig
}
