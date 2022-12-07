const {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
  ],
});
const Database = require("@replit/database");
const db = new Database();
const roll_dice = require('./functions/roll');
const rrcreate = require('./functions/rrcreate');
const rradd = require('./functions/rradd');
const role_remove_react = require('./functions/remove_role_on_react');
const role_add_react = require('./functions/add_role_on_react');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const SomgurID = "445177838426128384";
const DanielID = "317632338622414849";
const fs = require('node:fs');
const path = require('node:path');
const mySecret = process.env['TOKEN'];
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    console.log(`got path at ${filePath}`)
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}
client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isAutocomplete()) return;
  server_id = interaction.guild.id;
  const focusedValue = interaction.options.getFocused();
  choices = [];
  db.get(server_id).then(DB => {
    if (!DB.party){
      return;
    }
    DB.party.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
        if (key == "partyname"){
          choices.push(value);
        }
      });
    })
    const filtered = choices.filter(choice => choice.startsWith(focusedValue));
    interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
    );
  })
});
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('Dungeons and Dragons');
})
client.on('messageReactionAdd', (reaction, user) => {
  if(user == client.user){
    return;
  }
  role_add_react.add_role_react(reaction, user, client);
})
client.on('messageReactionRemove', (reaction, user) => {
  if(user == client.user){
    return;
  }
  role_remove_react.remove_role_react(reaction, user, client);
})
client.on('messageCreate', function(msg) {
  if(msg.author == client.user)return;
  const prefix = "!"
  var words = msg.content.split(' ');
  if (!msg.content.startsWith(prefix))return;
  if(msg.author.id == DanielID){
    randomNumber = Math.floor(Math.random() * 100) + 1
    if(randomNumber < 6)return;
  }
  const serverName = msg.guild.name;
  const ServerId = msg.guild.id;
  if(msg.author.id == SomgurID){
    if (msg.content.startsWith(prefix + 'keyclear')) {
      db.delete(ServerId);
      return msg.reply(`Key with id = "${ServerId}" cleared`);
    }
  }
  if (msg.content.startsWith(prefix + 'DBwhat')){
    if(msg.author.id == SomgurID){
      db.get(ServerId).then(value => {
        console.log("DB:")
        console.log(value)
      });
    }
  }
  if (msg.content.startsWith(prefix + 'rradd')){
    rradd.rradd(words, msg, ServerId, SomgurID);
  }
  if (msg.content.startsWith(prefix + 'rrcreate')){
    rrcreate.rrcreate(words, msg, ServerId, SomgurID);
  }
  if (msg.content.startsWith(prefix + 'roll')) {
    msg.reply("`!roll` has been moved to slash command")
  }
});
client.login(mySecret);

