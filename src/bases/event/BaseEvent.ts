import { IClassBasedEventExec, IEvent, IEventData } from '../../typings'
import { LTNClient } from '../../client'

class BaseEvent implements IEvent {
    readonly _fromDecorator!: boolean

    public data!: IEventData
    public exec!: IClassBasedEventExec

    public client!: LTNClient

    constructor(data?: IEventData, client?: LTNClient, fromDecorator?: boolean) {
        if (data) this.data = data

        if (client) this.client = client

        this._fromDecorator = fromDecorator ?? false
    }
}

export default BaseEvent
