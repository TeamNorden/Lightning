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

    for (const guard of client.config.commandGuards!) {
        if (!command.data.guards) break

        if (!(guard.name in command.data.guards)) continue

        if (
            command.data.guards[guard.name]
            && !guard.check(message)
        ) {
            if (guard.failMsg) message.channel?.sendMessage(guard.failMsg)
            return
        }
    }

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
