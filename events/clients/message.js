require("dotenv").config();
const Discord = require("discord.js");
const prefix = process.env.prefix;
const botID = process.env.botID;
const Event = require("../../structures/Event.js");
module.exports = class Message extends Event {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type == "text") {
            if (!message.guild.members.cache.get(this.client.user.id))
                await message.guild.members.fetch(this.client.user.id);
            if (!message.channel
                .permissionsFor(message.guild.me)
                .missing("SEND_MESSAGES")
            )
                return;
        }
        if (!message.channel.guild) return message.channel.send();

        const prefixMention = new RegExp(`^<@!?${this.client.user.id}>(|)`);
        const messageLower = message.content.toLowerCase();
        let prefix;
        prefix =
            messageLower.split(" ")[0].match(prefixMention) || process.env.prefix;

        if (messageLower.indexOf(process.env.prefix) === 0) {
            prefix = process.env.prefix;
        } else if (messageLower.split(" ")[0].match(prefixMention)) {
            prefix = prefixMention;
        } else {
            return;
        }
        let args;
        let command;

        const messageContent = message.content;

        if (prefix === process.env.prefix && !process.env.prefix.endsWith(" ")) {
            args = messageContent.split(" ");
            command = args.shift().toLowerCase();
            command = command.slice(process.env.prefix.length);
        } else if (
            prefix === process.env.prefix &&
            process.env.prefix.endsWith(" ")
        ) {
            args = messageContent.split(" ");
            args.shift();
            command = args.shift().toLowerCase();
        } else {
            args = messageContent.split(" ");
            args.shift();
            command = args.shift().toLowerCase();
        }

        if (this.client.command.find(c => {
                if (c.args && !args[0] && client.commands.has(command)) {
                    let reply = 'Por favor inserta argumentos'
                    if (c.usage) {
                        reply += `\nUso correcto: \`${process.env.prefix}${c.name} ${c.usage}\`` //Uso correcto: .help <argumentos>
                    }
                    return message.channel.send(reply)
                }
            }))
            console.log("mensaje recibido");
        commandRun(this.client);
        async function commandRun(client) {
            let cmd;
            if (client.commands.has(command)) {
                cmd = client.commands.get(command);
            } else if (client.aliases.has(command)) {
                cmd = client.aliases.get(command);
            } else return;

            try {
                cmd.run(client, message, args);
            } catch (e) {
                client.log(e);
                message.channel.send("hubo un error");
            }
        }
    }
};