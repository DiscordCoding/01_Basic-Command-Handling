const Discord = require("discord.js");
const chalk = require("chalk")
const fs = require('fs');
const archivo = require(".././lang/index.json")
const language = fs.readFileSync("lang/" + archivo.find(language => language.default).archivo).toString();

module.exports = class Client extends Discord.Client {
    constructor() {
        super({
            partials: [
                'MESSAGE',
                'CHANNEL'
            ],
            ws: {
                intents: [
                    'GUILDS',
                    'GUILD_MESSAGES',
                    'GUILD_MESSAGE_REACTIONS'
                ]
            },
            disableMentions: 'everyone',
            messageCacheMaxSize: 50,
            messageCacheLifetime: 60
        });

        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.language = JSON.parse(language)
        this.languageConf = archivo
    }

    log(msg) {
        console.log(chalk.white.bold(`[${new Date().toString().slice(16, 24)}] `) + msg)
    }
    async login(token = this.token) {
        super.login(token);
    }
}