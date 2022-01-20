import { ICommand, ICommandData, ICommandExec } from '../../typings'

class BaseCommand implements ICommand {
    public data!: ICommandData
    public exec!: ICommandExec

    constructor(data?: ICommandData) {
        if (data) this.data = data
    }
}

export default BaseCommand
