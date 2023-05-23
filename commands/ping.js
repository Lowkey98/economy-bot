module.exports = {
    data: {
        name: 'ping',
        description: 'this is ping command'
    },
    run : ({ interaction}) => {
        interaction.reply('Pong');
    }

}