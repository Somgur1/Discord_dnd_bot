const Database = require("@replit/database");
const db = new Database();
const emojiRegex = require('emoji-regex');

function countEmojis(str) {
  const emReg = emojiRegex();
   var firstEmoji = str.match(emReg);
  if (firstEmoji == null){
    firstEmoji = 0;
  }
  return firstEmoji;
}

module.exports = {
    rradd: function(message_split, msg, server_id, SomgurId){
        if(msg.author.id != SomgurId){
            if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
                return msg.reply("You cant make this command. You need to have the role `DM`.");
            }
        }
        RoleName = message_split[1];
        Reaction = message_split[2];
        RoleName = RoleName.replaceAll('-', ' ');
        if (!Reaction){
            return msg.reply("Invalid input");
        }
        const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
        if (msg.guild.roles.cache.find(role => role.name === RoleName)){
            myRole = msg.guild.roles.cache.find(role => role.name === RoleName);
            myRole = myRole.id;
        }
        else{
            return msg.reply(`Role (${RoleName}) does not exist`);
        }
        db.get(server_id).then(value => {
            value_check = null;
            value_check = value;
            if (value_check == null){
                return console.log("Use the command '!rrcreate' first");
            }
            objectvalue = Object.values(value.commands);
            result = objectvalue.find(playlist => playlist.roleId == myRole);
            try {
                if (result.roleId == myRole){
                    return msg.reply(`Role (${RoleName}) already exists`);
                }
            }
            catch (error) {
            }
            role_name = msg.guild.roles.cache.get(myRole);
            if(!role_name.editable){
                return msg.reply(`I cant edit that role (${RoleName}).`);
            }
            if (match){
                const [, animated, name, emid] = match;
                Reactionfind = match[2];
            }
            else{
                Reactionfind = Reaction;
            }
            result = objectvalue.find(playlist => playlist.reaction == Reactionfind);
            try {
                if (result.reaction == Reactionfind){
                    return msg.reply(`Reaction (${Reaction}) already exists`);
                }
            }
            catch (error) {
            }
            rrmessageid = value.messageid;
            msg.channel.messages.fetch(rrmessageid)
                .then(message => {
                    if (match){
                        const [, animated, name, emid] = match;
                        Reaction = match[0];
                    }
                    message.edit(message.content + "\n" + RoleName + " = " + Reaction);
                    message.react(Reaction);
                })
            if (match){
                const [, animated, name, emid] = match;
                Reaction = match[2];
            }
            reactionroleJSON = {
                "messageId" : rrmessageid,
                "reaction" : Reaction,
                "roleId" : myRole,
                "roletree": role_name,
            };
            value.commands.push(reactionroleJSON);
            db.set(server_id, value);
        })
            .catch(error => {
                console.log(error);
            })
    },
  rraddCommand: function(interaction, SomgurId){
        if(interaction.user.id != SomgurId){
            if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
                return interaction.reply("You cant make this command. You need to have the role `DM`.");
            }
        }
        server_id = interaction.commandGuildId;
        const role = interaction.options.getRole('role_to_add');
        roleId = role.id;
        reaction = interaction.options.getString('emoji');
      const emReg = emojiRegex();
    var firstEmoji = reaction.match(emReg);
    if (!firstEmoji){
      return interaction.reply({ content: `Invalid emoji (${reaction})`, ephemeral: true })
    }
    reaction = firstEmoji[0];
        const match = /<(a?):(.+):(\d+)>/u.exec(reaction);
        db.get(server_id).then(value => {
            value_check = null;
            value_check = value;
            if (value_check == null){
                return interaction.reply({content: "Use the command `!rrcreate new_message` first", ephemeral: true});
            }
            rrcommands = Object.values(value.commands);
            rrresult = rrcommands.find(coolRole => coolRole.roleId == roleId);
try{
                if(rrresult.roleId == roleId){
                    return interaction.reply({ content: `Role (${role}) already exists`, ephemeral: true});
                }
}
          catch (error) {
            }
            
            if(!role.editable){
              console.log("Editable is not");
                return interaction.reply({ content: `I cant edit that role (${role}).`, ephemeral: true });
            }
            if (match){
                const [, animated, name, emid] = match;
                Reactionfind = match[2];
            }
            else{
                Reactionfind = reaction;
            }
            result = rrcommands.find(emoji => emoji.reaction == Reactionfind);
            try {
                if (result.reaction == Reactionfind){
                    return interaction.reply({content: `Reaction (${reaction}) already exists`, ephemeral: true });
                }
            }
            catch (error) {
            }
            rrmessageid = value.messageid;
            interaction.channel.messages.fetch(rrmessageid)
                .then(message => {
                    if (match){
                        const [, animated, name, emid] = match;
                        Reaction = match[0];
                    }
                    message.edit({content: message.content + "\n" + `${role}` + " = " + reaction, "allowedMentions": { "users" : []}});
                    message.react(reaction);
                })
            if (match){
                const [, animated, name, emid] = match;
                Reaction = match[2];
            }
          else{
            Reaction = reaction;
          }
            reactionroleJSON = {
                "messageId" : rrmessageid,
                "reaction" : Reaction,
                "roleId" : roleId,
                "roletree": role,
            };
            value.commands.push(reactionroleJSON);
            db.set(server_id, value);
          interaction.reply({ content: 'Created your reaction role', ephemeral: true });
        })
            
    
    }
}