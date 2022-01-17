import { Message } from 'revolt.js/dist/maps/Messages'
import { LTNClient } from '../../client'

const messageHandler = (
    client: LTNClient,
    message: Message,
    args: string[] = []
) => {
    const { prefix } = client

    if (typeof message.content !== 'string') return

    if (!message.content.startsWith(prefix.toLowerCase())) return

    args = message.content.slice(prefix.length).split(/ +/g)

    const commandName = args.shift()

    const command = client.commands.get(commandName ?? '')

    if (!command) return

    try {
        command.exec(client, message, args)
    } catch (err) {
        client.logger.error(
            `There was an error running the command '${command.data.name}'!`,
            'COMMAND'
        )
    }
}

export default messageHandler
