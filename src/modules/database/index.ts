import { IClientDBOptions } from '../../typings'
import * as mongoose from 'mongoose'
import { LTNClient } from '../../client'

class Database {
    private readonly _uri: string

    public dbFunctionsDir: string

    public client: LTNClient

    public caching: boolean
    public typegoose: boolean

    public mongooseObj!: typeof mongoose

    constructor(options: IClientDBOptions & { client: LTNClient }) {
        this._uri = options.uri

        this.dbFunctionsDir = options.dbFunctionsDir

        this.client = options.client

        this.caching = options.caching ?? true
        this.typegoose = options.typegoose ?? false

        try {
            mongoose.connect(this._uri).then((obj) => {
                this.mongooseObj = obj
            })
        } catch (err) {
            this.client.logger.error(
                `Failed to connect to DB
Err: ${err}`,
                'DATABASE'
            )
        }
    }
}

export default Database
