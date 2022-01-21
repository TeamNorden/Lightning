import { ICommand, ICommandData, ICommandExec } from '../../typings'

class BaseCommand implements ICommand {
    readonly _fromDecorator!: boolean
    public data!: ICommandData
    public exec!: ICommandExec

    constructor(data?: ICommandData, fromDecorator?: boolean) {
        if (data) this.data = data
        this._fromDecorator = fromDecorator ?? false
    }
}

export default BaseCommand
