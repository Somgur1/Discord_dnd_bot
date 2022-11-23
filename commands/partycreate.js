const { SlashCommandBuilder } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const party_functions = require('./../functions/party_functions');

module.exports = {
	data: new SlashCommandBuilder()
  .setName('partycreate')
  .setDescription('Creates a party')
  .addStringOption(option =>
		option.setName('partyname')
			.setDescription('Name of the party')
			.setRequired(true)
                   ),
  async execute(interaction) {
    party_functions.party_create(interaction);
	},
}