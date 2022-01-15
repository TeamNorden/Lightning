import ICommand from '../typings/ICommand'
import BaseCommand from '../bases/command/BaseCommand'
import { IClientOptions, IClientConfig } from '../typings/IClientOptions'
import { readdirSync } from 'fs'
import commandHandler from '../modules/handlers/command.handler'
import IEvent from '../typings/IEvent'
import BaseEvent from '../bases/event/BaseEvent'
import { Client, ClientOptions as RevoltOptions } from 'revolt.js'
import eventHandler from '../modules/handlers/event.handler'

export class LTNClient extends Client {
    // Commands And Events
    public commands = new Map<string, ICommand | BaseCommand>()
    public events = new Map<string, IEvent | BaseEvent>()

    // Directories
    public readonly commandDir: string
    public readonly eventDir: string

    // Command Categories
    public categories: string[]

    // User Configuration
    public config: IClientConfig

    // Handlers
    private _loadCommands = commandHandler
    private _loadEvents = eventHandler

    constructor(options: IClientOptions, revoltOptions: RevoltOptions) {
        super(revoltOptions)

        this.commandDir = options.commandsDir
        this.eventDir = options.eventsDir

        this.categories = readdirSync(this.commandDir)

        this.config = options.config
    }

    public async start(token: string) {
        await this._loadCommands(this)
        await this._loadEvents(this)

        this.loginBot(token)
    }
}
