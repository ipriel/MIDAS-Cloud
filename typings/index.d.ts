declare type ObjectId = any;

declare type Mirror = {
    sn?: String,
    name?: String,
    services?: Array<ObjectId>
}

declare type Device = {
    mac?: String,
    name?: String,
    paired?: Boolean
}

declare type Service = {
    _id?: ObjectId,
    name?: String,
    type?: String,
    authorized?: Boolean,
    auth_url?: String,
    settings?: Array<Setting>
}

declare type ServiceTemplate = {
    type: String,
    auth_url?: String,
    settings: Array<Setting>
}

declare type Setting = {
    name?: String,
    val?: any,
    type?: String
}

declare type ObjectLink<T> = {
    userId: ObjectId,
    parentId?: ObjectId | String,
    child: T
}