![Lightning Banner](assets/Lightning-Banner.png)
# Lightning

Meet Lightning. 

> A bot framework for [Revolt](https://revolt.chat). 

This framework lets you, as a developer, focus on the things that matter, such as your user feedback, and not handle the messy stuff; let Lightning handle that for you.

To keep updated with the package and it's development, join the [Support Server](#support).

# Features
- TODO: Add features list

# Why Lightning?
- TODO: Add upsell

# Getting Started
## Default Lighting Project Structure (Recommended For Beginners)
- Simply install Lightning via the following
```cmd
npm i lightning
```
or if you're using yarn
```cmd
yarn add lightning
```

- Create a new Lightning project
```cmd
lightning-js new <your project's name>
```
## From Scratch
If you want to start from scratch, here's an example on how you could start:

```typescript
    import { LTNClient, Strictness, getDirname } from 'lightning'
    import path from 'path'

    const __dirname = getDirname(import.meta.url)

    const client = new LTNClient({
        commandsDir: path.join(__dirname, 'commands'),
        eventsDir: path.join(__dirname, 'events'),
        config: {
            structureType: 'OBJECT', // OBJECT | CLASS | DECORATOR
            typescript: true,
            strictness: Strictness.MODERATE // HIGH | MODERATE | LOW
        },
        database: { // optional
            uri: 'mongodb connection string',
            caching: true, // if you want local cache
            typegoose: true, // if you're using typegoose
        }
    })

    client.start('your token')
```

Lightning is fully ESM, so `require()` syntax and global variables like `__dirname` cannot be used (you can import getDirname from the lib and use it as shown above).

To run on javascript use the `node --experimental-specifier-resolution=node <file>` flag!

## Still Confused
Check out the [Examples](examples) folder for more help on how to start!

# Contributors
@Codeize
- [GitHub](https://github.com/Codeize)
- [Twitter](https://twitter.com/Codeize)

@FadTheChad
- [GitHub](https://github.com/FadTheChad)
- [Twitter](https://twitter.com/DankML_Pk)


# License
If you are interested in the license for Lightning please [read the license fully](https://github.com/TeamNorden/legal/blob/main/LICENSE.md) or [join our support server](#support).

# Contributing
We would love for people to help us out with Lightning. Start with an [issue](https://github.com/TeamNorden/issues/new) or a [pull request](https://github.com/TeamNorden/pulls/new) and we'll get right on it!

Here's a high level guide on how to spin up a development version of the framework:
- `yarn`
- Coming soon...


# Support
[![widget](https://invidget.switchblade.xyz/854739172580655134)](https://discord.gg/7syTGCkZs8)
