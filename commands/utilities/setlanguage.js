const Command = require("../../structures/Commandos.js")
const fs = require('fs')
const Discord = require("discord.js")
const categories = fs.readdirSync('./commands')

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "setlanguage",
            description: "Setear el idioma :)",
            alias: ["language", "idioma", "lang", "lng"],
            usage: "<language prefix>",
            args: true,
        })
    }
    async run(client, message, args) {

        client.languageConf.find(c => {
            console.log(c)
            if (c.default === true) {
                if (!args[0]) {
                    message.channel.send("Aquí tienes información del lenguaje actual:")
                    const embed = new Discord.MessageEmbed()
                        .addField("Nombre:", c.nombreCompleto)
                        .addField("Abreviatura:", c.nombre);
                    message.channel.send(embed)
                }
            } else if (c.default === false) {
                if (args[0] === c.nombre || c.nombreCompleto) {
                    

                }
            }
        })
    }
}