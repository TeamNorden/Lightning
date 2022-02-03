import { LTNClient } from '../../client'
import { readdirSync } from 'fs'

import { IEvent } from '../../typings'
import BaseEvent from '../../bases/event/BaseEvent'

import { Class } from 'type-fest'
import path from 'path'
import { pathToFileURL } from 'url'

const eventHandler = async (client: LTNClient) => {
    const { eventDir } = client
    const { structureType } = client.config

    let eventFiles = readdirSync(client.eventDir).filter((file) =>
        ['.js', '.ts'].includes(path.extname(file)) && !file!.endsWith('d.ts')
    )

    for (let file of eventFiles) {
        let filePath = pathToFileURL(path.join(eventDir, file)).toString()

        let req = await import(filePath)

        let event: IEvent | BaseEvent

        if (structureType === 'OBJECT') {
            event = req.default as IEvent
        } else {
            let EventClass = req.default as Class<BaseEvent>

            event = new EventClass()

            if (!(event instanceof BaseEvent)) {
                throw new TypeError(
                    `Command ${event.data.name}doesn't seem to be an instance of BaseEvent. Did you forget extending it?`
                )
            }
        }

        client.events.set(event.data.name, event)
    }
}

export default eventHandler
