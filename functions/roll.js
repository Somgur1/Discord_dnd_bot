const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const {
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  roll_dice: function(interaction) {
    const dice = interaction.options.getString('dice');
    const GM = interaction.options.getUser('gm-roll');
    const server_id = interaction.guildId;
    const server_name = interaction.client.guilds.cache.get(server_id);
    const user_tree = interaction.user;
    const user_id = interaction.user.id;
    const username = interaction.user.username;
    const url = 'https://rolz.org/api/?' + dice + '.json';
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(user => {
        var result = String(user["result"]);
        const diceEmbed = new EmbedBuilder()
          .setColor('Red')
          .setTitle('Dice roller')
          .addFields(
            { name: 'input', value: user["input"] },
            { name: 'result', value: result, inline: true },
            { name: 'details', value: user["details"], inline: true }
          );
        if (GM) {
          GM.send({ content: `<@${user_id}> rolled a ${dice} in ${server_name} (<#${interaction.channel.id}>)`, embeds: [diceEmbed] });

          interaction.reply({ embeds: [diceEmbed], ephemeral: true });
        }
        else {
          interaction.reply({ embeds: [diceEmbed] });
        }

      })
      .catch((error) => {
      });
  }
}

