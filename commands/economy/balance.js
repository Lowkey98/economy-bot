const { ApplicationCommandOptionType } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile.js");

module.exports = {
  data: {
    name: "balance",
    description: "This command retrieves the user's balance.",
    options: [
      {
        name: 'target-user',
        description: 'The user to get the balance of',
        required: false,
        type: ApplicationCommandOptionType.Mentionable,
      }
    ]
  },
  run: async ({ interaction }) => {

    if (!interaction.inGuild()) return;

    await interaction.deferReply(); // Defer the reply to show the user that the bot is processing the command.
    // if no user is specified, use the user who ran the command
    const userId = interaction.options.getUser('target-user')?.id ?? interaction.member.id;
    let userProfile = await UserProfile.findOne({
      userId: userId,
    });
    if (!userProfile) {
      userProfile = new UserProfile({
        userId: userId,
      });
      await userProfile.save();
    }
    await interaction.editReply(`Balance for <@${userId}> is ${userProfile.balance}`); // Edit the deferred reply with the actual balance value.

    // let userId;
    // const userOption = interaction.options.getUser('user');
    // if (userOption) {
    //     userId = userOption.id;
    // } else {
    //     userId = interaction.member.id;
    // }
    // let userProfile = await UserProfile.findOne({
    //     userId: userId,
    // });
    // if (!userProfile) {
    //     userProfile = new UserProfile({
    //         userId: userId,
    //     });
    //     await userProfile.save();
    // }
    // await interaction.editReply(`Balance for <@${userId}> is ${userProfile.balance}`); // Edit the deferred reply with the actual balance value.
  },
};
