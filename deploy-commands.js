const { REST, Routes } = require('discord.js');
clientId = "1032986069643296798";
const token = process.env['TOKEN']
const guildId = "445180187358003220";
// const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

    //for creating global commands
		// const data = await rest.put(
		// 	Routes.applicationCommands(clientId),
		// 	{ body: commands },
		// );

    //for creating commands server based
    const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();