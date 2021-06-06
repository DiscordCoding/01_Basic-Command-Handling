const Command = require("../../structures/Commandos.js")
const fs = require('fs')
const categories = fs.readdirSync('./commands')

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            description: "Reload all commands you want",
            alias: ["rl", "rld"],
            args: true,
        })
    }
    async run(client, message, args) {
        categories.forEach(async(category) => {
            fs.readdir(`./commands/${category}`, (err) => {
                if (err) return console.log(err);
                const iniciar = async() => {
                    const commands = fs.readdirSync(`./commands/${category}`).filter(archivo => archivo.endsWith(".js"))
                    for (const archivo of commands) {
                        const a = require(`../../commands/${category}/${archivo}`)
                        delete require.cache[require.resolve(`../../commands/${category}/${archivo}`)]
                        const command = new a(client);
                        client.commands.set(command.name.toLowerCase(), command);
                        if (command.aliases && Array.isArray(command.aliases)) {
                            for (let i = 0; i < command.aliases.length; i++) {
                                client.aliases.set(command.aliases[i], command);
                            }
                        }
                    }
                }
                iniciar().then(() => {
                    message.channel.send(client.language.reload)
                })
            })
        })
    }
}