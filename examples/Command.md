# Commands Example
Commands allow the user to interact with the bot. They're really simple to make! Depending on what configuration you have for your client's structureType, here are the ways to make a command

## Object
### Typescript

```typescript
import { ICommand } from 'lightning'

const command: ICommand = {
    data: {
        name: 'command-name',
        description: 'This command is an example!',
        aliases: ['alias'],
        category: 'misc'
    },
    exec: (client, message, args) => {
        message.channel!.sendMessage('Hello There!')
    }
}

export default command
```

### Javascript

```javascript
const command = {
    data: {
        name: 'command-name',
        description: 'This command is an example!',
        aliases: ['alias'],
        category: 'misc'
    },
    exec: (client, message, args) => {
        message.channel.sendMessage('Hello There!')
    }
}

export default command
```

## Class
### Typescript

```typescript
import { BaseCommand } from 'lightning'

class ExampleCommand extends BaseCommand {
    public data = {
        name: 'command-name',
        description: 'This command is an example!',
        aliases: ['alias'],
        category: 'misc'
    }
    
    public exec = (message, args) => {
        message.channel!.sendMessage('Hello There!')
    }
}

export default ExampleCommand
```

### Javascript

```javascript
import { BaseCommand } from 'lightning'

class ExampleCommand extends BaseCommand {
    data = {
        name: 'command-name',
        description: 'This command is an example!',
        aliases: ['alias'],
        category: 'misc'
    }
    
    exec = (message, args) => {
        message.channel.sendMessage('Hello There!')
    }
}

export default ExampleCommand
```

## Decorator
[This version does not fully support javascript]

### Typescript

```typescript
import { BaseCommand, command } from 'lightning'

@command({
    name: 'command-name',
    description: 'This command is an example!',
    aliases: ['alias'],
    category: 'misc'
})
class ExampleCommand extends BaseCommand {
    public exec = (message, args) => {
        message.channel!.sendMessage('Hello There!')
    }
}
```
