const {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
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
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const SomgurID = "445177838426128384";
const DanielID = "317632338622414849";
const mySecret = process.env['TOKEN']
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('messageReactionAdd', (reaction, user) => {
if(user == client.user){
    return;
  }  
  reactionName = reaction._emoji.name
  msgId = reaction.message.id
  serverId = reaction.message.guildId
  db.get(serverId).then(value => {
  objectvalue = Object.values(value.commands)
  result = objectvalue.filter(playlist => playlist.reaction == reactionName)
  try {
    reactionName = result[0].reaction
    reactionMessageId = result[0].messageId
    reactionRoleId = result[0].roleId
    role_tree = result[0].roletree
    role_name = role_tree.name;
    var guild = client.guilds.cache.get(serverId);
    role_check = guild.roles.cache.find((r) => r.name === role_name);
  if(!role_check.editable) return;
    if (reactionMessageId == msgId ){
      
  reaction.message.guild.members.cache.get(user.id).roles.add(reactionRoleId);
  
    }
  } catch (error) {
    console.log(error);
  }
  })
})

client.on('messageReactionRemove', (reaction, user) => {
  reactionName = reaction._emoji.name
  msgId = reaction.message.id
  serverId = reaction.message.guildId
  db.get(serverId).then(value => {
    objectvalue = Object.values(value.commands)
    result = objectvalue.filter(playlist => playlist.reaction == reactionName)
    try {
      reactionName = result[0].reaction
      reactionMessageId = result[0].messageId
      reactionRoleId = result[0].roleId
      role_tree = result[0].roletree
      role_name = role_tree.name;
      var guild = client.guilds.cache.get(serverId);
      role_check = guild.roles.cache.find((r) => r.name === role_name);
      if(!role_check.editable) return;
      if (reactionMessageId == msgId ){
      reaction.message.guild.members.cache.get(user.id).roles.remove(reactionRoleId);
      }
    } 
    catch (error) {
      console.log(error);
    }
  })
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
  const serverName = msg.guild.name
  ServerId = msg.guild.id
  if(msg.author.id == SomgurID){
    if (msg.content.startsWith(prefix + 'dbclear')){
      if(msg.author.id == SomgurID){
      db.empty();
      msg.reply("db cleared")
      }
      else{
      }
    }
  }
  if (msg.content.startsWith(prefix + 'rradd')){
    if(msg.author.id != SomgurID){
      if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
        return msg.reply("You cant make this command")
      }
    }
    RoleName = words[1]
    Reaction = words[2]
    RoleName = RoleName.replaceAll('-', ' ')
    if (!Reaction){
      return msg.reply("Invalid input")
    }
    const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
    if (msg.guild.roles.cache.find(role => role.name === RoleName)){
      myRole = msg.guild.roles.cache.find(role => role.name === RoleName)
      myRole = myRole.id
    }
    else{
      return msg.reply(`Role (${RoleName}) does not exist`)
    }  
    db.get(ServerId).then(value => {
      objectvalue = Object.values(value.commands)
      result = objectvalue.filter(playlist => playlist.roleId == myRole)
      try {
        if (result[0].roleId == myRole){
          return msg.reply(`Role (${RoleName}) already exists`)
        }
      } 
      catch (error) {
      }
      role_name = msg.guild.roles.cache.get(myRole);
      if(!role_name.editable){
        return msg.reply(`I cant edit that role (${RoleName}).`)
      }
      if (match){
         const [, animated, name, emid] = match
         Reactionfind = match[2]
      }
      else{
        Reactionfind = Reaction
      }
      result = objectvalue.filter(playlist => playlist.reaction == Reactionfind)
      try {
        if (result[0].reaction == Reactionfind){
          return msg.reply(`Reaction (${Reaction}) already exists`)
        }
      } 
      catch (error) {
      }
      rrmessageid = value.messageid
      msg.channel.messages.fetch(rrmessageid)
      .then(message => {
         if (match){
            const [, animated, name, emid] = match
            Reaction = match[0]
          }  
         message.edit(message.content + "\n" + RoleName + " = " + Reaction)
         message.react(Reaction);
      })
      if (match){
      const [, animated, name, emid] = match
      Reaction = match[2]
      }
      reactionroleJSON = {
        "messageId" : rrmessageid,    
        "reaction" : Reaction,
        "roleId" : myRole,
        "roletree": role_name,
      }; 
      value.commands.push(reactionroleJSON);
      db.set(ServerId, value);  
    })
    .catch(error => {

    })
  }
  if (msg.content.startsWith(prefix + 'rrcreate')){
    if(msg.author.id != SomgurID){
      if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
        return msg.reply("You cant make this command")
      }
    }
    RoleName = words[1]
    Reaction = words[2]
    if (!Reaction){
      return msg.reply("Invalid input")
    }
    RoleName = RoleName.replaceAll('-', ' ')
    const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
    if (msg.guild.roles.cache.find(role => role.name === RoleName)){
      myRole = msg.guild.roles.cache.find(role => role.name === RoleName)
      role_name = myRole;
      myRole = myRole.id
    }
    else{
      return msg.reply(`Role (${RoleName}) does not exist`)
    } 
    if(!role_name.editable){
      return msg.reply(`I cant edit that role (${RoleName}).`)
    } 
    msg.channel.send("Reaction roles \n" + RoleName + " = " + Reaction).then(sent => {
      let id = sent.id;
      sent.react(Reaction);
      if (match){
        const [, animated, name, emid] = match
        Reaction = match[2]
      }
      rrcommands = {
        "server":ServerId,
        "messageid":id,
        "commands":[
          {"messageId":id, "reaction":Reaction, "roleId":myRole, "roletree": role_name},
        ]
      };
      db.set(ServerId, rrcommands);
    });
  }   
  if (msg.content.startsWith(prefix + 'roll')) {
    userCommand = words[1]
    const dRollCheck = Array.from(userCommand)[1];
    var word2 = words[1];
    var url = 'https://rolz.org/api/?' + word2 + '.json';
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(user => {
        var result = String(user["result"]);
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Dice roller')
          .addFields(
		        { name: 'input', value: user["input"] },
		        { name: 'result', value: result, inline: true },
		        { name: 'details', value: user["details"], inline: true }
          );
        msg.reply({ embeds: [exampleEmbed] })
      })
      .catch((error) => {
        msg.reply("Invalid input")
      });
  }
});
client.login(mySecret);

