//------------------------------------------
//         CONSTANTES Y VARIABLES
//------------------------------------------
require('dotenv').config()
const fs = require("fs")
const Discord = require('discord.js');
const Bot = require('./structures/Client.js')
const client = new Bot()
client.login(process.env.token).then((data) => {
    client.log('El bot está funcionando')
})
require("./handlers/events.js")(client)
require("./handlers/commands.js")(client)
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();