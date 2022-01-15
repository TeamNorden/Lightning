import { IEvent, IEventData, IEventExec } from '../../typings/IEvent'

class BaseEvent implements IEvent {
    public data!: IEventData
    public exec!: IEventExec

    constructor(data?: IEventData) {
        if (data) this.data = data
    }
}

export default BaseEvent
