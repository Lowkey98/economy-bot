const UserProfile = require("../../schemas/UserProfile.js");
const dailyAmount = 100;
module.exports = {
  data: {
    name: "daily",
    description: "Get your daily reward",
  },
  run: async ({ interaction }) => {
    if (!interaction.inGuild()) return;
    try {
      await interaction.deferReply();

      let userProfile = await UserProfile.findOne({
        userId: interaction.member.id,
      });
      if (userProfile) {
        const lastDaily = userProfile.lastDaily?.toDateString();
        const today = new Date().toDateString();
        if (lastDaily === today) {
          return interaction.editReply("You have already claimed your daily");
        }
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
        });
      }

      userProfile.balance += dailyAmount;
      userProfile.lastDaily = new Date();
      await userProfile.save();
      interaction.editReply( 
        ` ${dailyAmount}  has been added to your balance.\n you now have  ${userProfile.balance} `
      );
    } catch (err) {
      console.log(err);
    }
  },
};
