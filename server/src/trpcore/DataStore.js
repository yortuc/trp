class DataStore {
    constructor(initial_state, reducers, onStateChange){
        this.state = initial_state
        this.reducers = reducers
        this.onStateChange = onStateChange
    }

    reduce(message, payload) {
        this.state = this.reducers.reduce((prev, cur) => cur(prev, message, payload), this.state)
        this.onStateChange(this.state)
    }
}

export default DataStore;
