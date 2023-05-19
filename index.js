
require('dotenv/config')
const { Client , IntentsBitField } = require('discord.js')

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]})

client.on('ready', () => {
    console.log("BOT IS ONLINE");
})
client.login(process.env.TOKEN)