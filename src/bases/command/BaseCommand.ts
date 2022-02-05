import { IClassBasedCommandExec, ICommand, ICommandData } from '../../typings'
import { LTNClient } from '../../client'

class BaseCommand implements ICommand {
    readonly _fromDecorator!: boolean

    public data!: ICommandData
    public exec!: IClassBasedCommandExec

    public client!: LTNClient

    constructor(
        data?: ICommandData,
        client?: LTNClient,
        fromDecorator?: boolean
    ) {
        if (data) this.data = data

        if (client) this.client = client

        this._fromDecorator = fromDecorator ?? false
    }
}

export default BaseCommand
