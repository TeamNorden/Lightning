import { Client, ClientOptions as RevoltOptions } from 'revolt.js'

import { readdirSync } from 'fs'

// Bases
import BaseCommand from '../bases/command/BaseCommand'
import BaseEvent from '../bases/event/BaseEvent'

// Typings
import {
    IClientConfig,
    IClientOptions,
    ICommand,
    IEvent,
    Strictness
} from '../typings'

// Handlers
import eventHandler from '../modules/handlers/event.handler'
import commandHandler from '../modules/handlers/command.handler'
import messageHandler from '../modules/handlers/message.handler'

// Utils
import LTNLogger from '../modules/utils/Logger'

export class LTNClient extends Client {
    // Commands And Events
    public commands = new Map<string, ICommand | BaseCommand>()
    public events = new Map<string, IEvent | BaseEvent>()

    // Prefix (default: '!')
    public prefix = '!'

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
    private _loadMessageHandler = (
        handler: typeof messageHandler = messageHandler
    ) => {
        this.on('message', (message) => {
            handler(this, message)
        })
    }

    constructor(options: IClientOptions, revoltOptions: RevoltOptions) {
        super(revoltOptions)

        this.commandDir = options.commandsDir
        this.eventDir = options.eventsDir

        this.categories = readdirSync(this.commandDir)

        this.config = options.config

        if (
            !this.config.messageHandler ||
            this.config.messageHandler === 'DEFAULT'
        )
            this.config.messageHandler = messageHandler

        this.logger = new (options.logger?.class ?? LTNLogger)(
            options.logger?.options ?? {
                primary: [209, 35, 49],
                secondary: [255, 87, 87]
            },
            this.config.strictness ?? Strictness.MODERATE
        )
    }

    public matchTypes = (type: string, element: any) => {
        if (type === 'ARRAY' && Array.isArray(type)) return

        if (typeof element === type.toLowerCase()) return

        this.logger.error(
            `'${element}' is supposed to be of type '${type.toUpperCase()}'`
        )
    }

    public start = async (token: string, silent: boolean = true) => {
        await this._loadCommands(this)
        await this._loadEvents(this)

        if (this.config.messageHandler !== 'NONE')
            await this._loadMessageHandler(
                this.config.messageHandler as typeof messageHandler
            )

        await this.loginBot(token)

        if (!silent)
            this.logger.log('LOGIN', 'Bot has logged in! Thanks for using LTN!')
    }
}
