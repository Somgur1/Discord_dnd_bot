const Database = require("@replit/database");
const db = new Database();
const emojiRegex = require('emoji-regex');


module.exports = {
    rrcreate: function(message_split, msg, server_id, SomgurId){
        if(msg.author.id != SomgurId){
            if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
                return msg.reply("You cant make this command");
            }
        }
        RoleName = message_split[1];
        Reaction = message_split[2];
        if (!Reaction){
            return msg.reply("Invalid input");
        }
        RoleName = RoleName.replaceAll('-', ' ');
        const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
        if (msg.guild.roles.cache.find(role => role.name === RoleName)){
            myRole = msg.guild.roles.cache.find(role => role.name === RoleName);
            role_name = myRole;
            myRole = myRole.id;
        }
        else{
            return msg.reply(`Role (${RoleName}) does not exist`);
        }
        if(!role_name.editable){
            return msg.reply(`I cant edit that role (${RoleName}).`);
        }
        msg.channel.send("Reaction roles \n" + RoleName + " = " + Reaction).then(sent => {
            let id = sent.id;
            sent.react(Reaction);
            if (match){
                const [, animated, name, emid] = match;
                Reaction = match[2];
            }
            db.get(server_id).then(value => {
                try{
                    party = value.party;
                    rrcommands = {
                        "server":server_id,
                        "messageid": id,
                        "commands":[
                            {"messageId":id, "reaction":Reaction, "roleId":myRole, "roletree": role_name},
                        ],
                        party
                    };
                }
                catch (error) {
                    rrcommands = {
                        "server":server_id,
                        "messageid": id,
                        "commands":[
                            {"messageId":id, "reaction":Reaction, "roleId":myRole, "roletree": role_name},
                        ],
                        "party":
                            []
                    };
                }
                db.set(server_id, rrcommands);
            });
        });
    },
  rrcreateCommand: function(interaction, SomgurId){
    if(interaction.user.id != SomgurId){
            if (interaction.user.roles.cache.some(role => role.name !== 'DM')) {
                return interaction.reply("You cant make this command");
            }
        }
        const role = interaction.options.getRole('role_to_add');
        roleName = role.name;
        roleId = role.id;
      
        roleCheck = interaction.guild.roles.cache.find(role => role.name === roleName);
      reaction = interaction.options.getString('emoji');
    const match = /<(a?):(.+):(\d+)>/u.exec(reaction);
      const emReg = emojiRegex();
    var firstEmoji = reaction.match(emReg);
    if (!firstEmoji){
      if (!match){
        return interaction.reply({ content: `Invalid emoji (${reaction})`, ephemeral: true })
    }
      else{
      reaction = match[0];
      }
  }
      else{
      reaction = firstEmoji[0];
    }
        const channel = interaction.options.getChannel('channel_name')
        server_id = interaction.guildId;
        if(!role.editable){
            return interaction.reply(`I cant edit that role (${roleName}).`);
        }
       channel.send({content: `Reaction roles` + `\n` +  `${role}  = ` + reaction, "allowedMentions": { "users" : []}}).then(sent => {
            let id = sent.id;
         try{
            sent.react(reaction);
         }
         catch (error) {
           return interaction.reply({ content: `Invalid emoji (${reaction})`, ephemeral: true });
         }
            if (match){
                const [, animated, name, emid] = match;
                reaction = match[2];
            }
            db.get(server_id).then(value => {
                try{
                    party = value.party;
                    rrcommands = {
                        "server":server_id,
                        "messageid": id,
                        "commands":[
                            {"messageId":id, "reaction":reaction, "roleId":roleId, "roletree": role},
                        ],
                        party
                    };
                }
                catch (error) {
                    rrcommands = {
                        "server":server_id,
                        "messageid": id,
                        "commands":[
                            {"messageId":id, "reaction":reaction, "roleId":roleId, "roletree": role},
                        ],
                        "party":
                            []
                    };
                }
                db.set(server_id, rrcommands);
              console.log("after db Set")
              console.log(rrcommands)
              interaction.reply({ content: 'Created your reaction role', ephemeral: true });
            });
        });
  }
}