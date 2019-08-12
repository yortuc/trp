class DataStore {
    constructor(initial_state, reducers){
        this.state = initial_state
        this.reducers = reducers
    }

    reduce(message, payload) {
        this.state = this.reducers.reduce((prev, cur) => cur(prev, message, payload), this.state)
    }
}

export default DataStore;
