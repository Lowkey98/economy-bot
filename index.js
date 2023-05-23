require('dotenv/config')
const { Client , IntentsBitField } = require('discord.js')
const { CommandHandler } = require('djs-commander')
const { default: mongoose } = require('mongoose')
const path = require('path')
const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]})

new CommandHandler({
        client,
        eventsPath : path.join(__dirname, "events"),
        commandsPath : path.join(__dirname, "commands")
});

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    client.login(process.env.TOKEN)
})();