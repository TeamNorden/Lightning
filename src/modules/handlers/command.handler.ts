import fs, { readdirSync } from 'fs'
import path from 'path'

import { LTNClient } from '../../client'

import { ICommand } from '../../typings'
import BaseCommand from '../../bases/command/BaseCommand'

import { Class } from 'type-fest'
import { pathToFileURL } from 'url'

const commandHandler = async (client: LTNClient) => {
    const { categories, commandDir } = client
    const { structureType } = client.config

    for (let folder of categories) {
        let folderFiles = readdirSync(path.join(commandDir, folder)).filter((file) => {
                return ['.js', '.ts'].includes(path.extname(file)) && !file.endsWith('.d.ts')
            }
        )

        for (let file of folderFiles) {
            let filePath = pathToFileURL(path.join(commandDir, folder, file)).toString()

            let req = await import(filePath)

            let command: ICommand | BaseCommand

            if (structureType == 'OBJECT') {
                command = req.default as ICommand

                if (command instanceof BaseCommand) {
                    client.logger.error(
                        `Command ${command.data.name} doesn't seem to be an Object. Did you use a Class?`
                    )
                }
            } else {
                let CommandClass = req.default as Class<BaseCommand>

                command = new CommandClass(undefined, client)

                if (!(command instanceof BaseCommand)) {
                    return client.logger.error(
                        `Command ${command.data.name} doesn't seem to be an instance of BaseCommand`
                    )
                }

                if (structureType === 'DECORATOR' && !command._fromDecorator) {
                    return client.logger.error(
                        `Command ${command.data.name} does not seem to be a decorator command`
                    )
                }

                if (structureType === 'CLASS' && command._fromDecorator) {
                    return client.logger.error(
                        `Command ${command.data.name} doesn't seem to be Class Command`
                    )
                }
            }

            client.commands.set(command.data.name, command)
        }
    }
}

export default commandHandler
