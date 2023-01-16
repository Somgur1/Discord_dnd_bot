const { REST, Routes } = require('discord.js');
// clientId = "1032986069643296798";
// const token = process.env['TOKEN']
const token = "MTAzNjcwNjMwMjA0MDIxOTY5MA.GYfWnK.8jjAqAe5gsxB5q6GXHCV1TOFc2nfZBhmzm8hmc";
const guildId = "445180187358003220";
clientId = "1036706302040219690";
const single_command = require('./commands/partydelete')
console.log(token);
// const { clientId, guildId, token } = require('./config.json');

const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const rest = new REST({ version: '10' }).setToken(token);
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// for creating global commands
		// const data = await rest.put(
		// 	Routes.applicationCommands(clientId),
		// 	{ body: commands },
		// );
		//for creating commands server based (I have not really tested what happens with the other commands with this. I do know that server specific commands wil get overwritten.)
		  const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		//Make sure to only use global commands OR guild commands
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();