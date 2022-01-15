import { Client, ClientOptions as RevoltOptions } from 'revolt.js'

import { readdirSync } from 'fs'

// Bases
import BaseCommand from '../bases/command/BaseCommand'
import BaseEvent from '../bases/event/BaseEvent'

// Typings
import { IClientOptions, IClientConfig, ICommand, IEvent } from '../typings'

// Handlers
import eventHandler from '../modules/handlers/event.handler'
import commandHandler from '../modules/handlers/command.handler'

// Utils
import LTNLogger from '../modules/utils/Logger'

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

    // Logger
    public logger: LTNLogger

    // Handlers
    private _loadCommands = commandHandler
    private _loadEvents = eventHandler

    constructor(options: IClientOptions, revoltOptions: RevoltOptions) {
        super(revoltOptions)

        this.commandDir = options.commandsDir
        this.eventDir = options.eventsDir

        this.categories = readdirSync(this.commandDir)

        this.config = options.config

        this.logger = new (options.logger?.class ?? LTNLogger)(options.logger?.options ?? {
            primary: [209, 35, 49],
            secondary: [255, 87, 87]
        })
    }

    public async start(token: string, silent: boolean = true) {
        await this._loadCommands(this)
        await this._loadEvents(this)

        await this.loginBot(token)
        if (!silent) this.logger.log('LOGIN', 'Bot has logged in! Thanks for using LTN!')
    }
}
