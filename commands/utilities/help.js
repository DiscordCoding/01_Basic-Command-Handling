const Command = require("../../structures/Commandos.js")

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "idk",
            alias: ["hey", "test"],
        })
    }
    async run(client, message, args) {
        message.channel.send('a')
    }
}