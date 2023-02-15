export class Events {
    constructor() {
        this.handlers = {
            update: [],
            error:[console.error],
            save:[],
            saved:[],
            delete: [],
            cancel: []
        }
    }
}