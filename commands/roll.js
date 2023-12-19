const { SlashCommandBuilder } = require('discord.js');
const roll_dice = require('./../functions/roll');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll_dice')
    .setDescription('Roll a dice')
    .addStringOption(option =>
      option.setName('dice')
        .setDescription('What dice to role. (1d20)')
        .setRequired(true)
    )
    .addUserOption(option =>
      option
        .setName('gm-roll')
        .setDescription('Who is the GM')),
  async execute(interaction) {
    roll_dice.roll_dice(interaction);
  },
};