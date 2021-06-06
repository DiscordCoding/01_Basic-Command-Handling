const Discord = require("discord.js")
class Event {

    constructor(client, file, options = {}) {

        this.client = client
        this.name = options.name || file.name
        this.file = file
    }

    async run(...args) {
        const channel = this.client.channels.cache.get(process.env.errorChannel)
        try {
            await this.run(...args)
        } catch (err) {
            channel.send(this.client.language.event_error)
            console.error(err)
        }
    }
    reload() {
        const dirección = `./events/${this.name}.js`;
        delete require.cache(dirección);
        require(`./events/${this.name}.js`)
    }
}
module.exports = Event;