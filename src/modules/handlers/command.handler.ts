import fs, { readdirSync } from 'fs'
import path from 'path'

import { LTNClient } from '../../client'

import { ICommand } from '../../typings'
import BaseCommand from '../../bases/command/BaseCommand'

import { Class } from 'type-fest'

const commandHandler = async (client: LTNClient) => {
    const { categories } = client
    const { structureType } = client.config

    for (let folder of categories) {
        let folderFiles = readdirSync(folder).filter((file) =>
            ['js', 'ts'].includes(path.extname(file))
        )

        for (let file of folderFiles) {
            let req = await import(file)

            let command: ICommand | BaseCommand

            if (structureType == 'OBJECT') {
                command = req.default as ICommand
            } else {
                let CommandClass = req.default as Class<BaseCommand>

                command = new CommandClass()

                if (!(command instanceof BaseCommand)) {
                    throw new TypeError(
                        `Command ${command.data.name}doesn't seem to be an instance of BaseCommand. Did you forget extending it?`
                    )
                }
            }

            client.commands.set(command.data.name, command)
        }
    }
}

export default commandHandler
