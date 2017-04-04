declare type ObjectId = any;

declare type Mirror = {
    _id?: ObjectId,
    sn?: String,
    name?: String,
    services?: Array<ObjectId>
}

declare type Device = {
    _id?: ObjectId,
    mac?: String,
    name?: String,
    paired?: Boolean
}

declare type Service = {
    _id?: ObjectId,
    name?: String,
    type?: String,
    settings?: Array<Setting>
}

declare type Setting = {
    name?: String,
    val?: any,
    type?: String
}

declare type ObjectLink = {
    parentId: ObjectId,
    child: any
}