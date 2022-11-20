const { REST, Routes } = require('discord.js');
clientId = "1032986069643296798";
const token = process.env['TOKEN']

const rest = new REST({ version: '10' }).setToken(token);

// ...

// // for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// for global commands
rest.delete(Routes.applicationCommand(clientId, '1043125853023895642'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);