class MessageBus {
    constructor() {
        this.channels = {}
    }

    listen(channel, callback) {
        if (this.channels[channel]) {
            this.channels[channel].push(callback)
        }
        else {
            this.channels[channel] = [callback]
        }
    }

    say(channel, payload) {
        if(!this.channels[channel]) {
            this.channels[channel] = []
        }
        this.channels[channel].forEach(cb => cb(payload))
    }
}
