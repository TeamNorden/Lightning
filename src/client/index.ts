import ICommand from '../typings/ICommand'
import BaseCommand from '../bases/command/BaseCommand'
import IClientOptions, { IClientConfig } from '../typings/IClientOptions'
import { readdirSync } from 'fs'
import commandHandler from '../modules/handlers/command.handler'

export class LTNClient {

    // Commands And Events
    public commands = new Map<string, ICommand | BaseCommand>()
    public events = new Map<string, object>()

    // Directories
    public readonly commandDir: string
    public readonly eventDir: string

    // Command Categories
    public categories: string[]

    // User Configuration
    public config: IClientConfig

    // Handlers
    private _loadCommands = commandHandler

    constructor(options: IClientOptions) {
        this.commandDir = options.commandsDir
        this.eventDir = options.eventsDir

        this.categories = readdirSync(this.commandDir)

        this.config = options.config
    }

    public async start(token: string) {
        await this._loadCommands(this)
    }
}
