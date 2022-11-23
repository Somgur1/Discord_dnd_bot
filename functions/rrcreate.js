const Database = require("@replit/database");
const db = new Database();
module.exports = {
  rrcreate: function(message_split, msg, server_id, SomgurId){
  
      if(msg.author.id != SomgurId){
      if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
        return msg.reply("You cant make this command")
      }
    }
    RoleName = message_split[1]
    Reaction = message_split[2]
    if (!Reaction){
      return msg.reply("Invalid input")
    }
    RoleName = RoleName.replaceAll('-', ' ')
    const match = /<(a?):(.+):(\d+)>/u.exec(Reaction);
    if (msg.guild.roles.cache.find(role => role.name === RoleName)){
      myRole = msg.guild.roles.cache.find(role => role.name === RoleName)
      role_name = myRole;
      myRole = myRole.id;
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
      db.get(server_id).then(value => {
  party = null;
  party = value.party;
  
    if (party != null){
    rrcommands = {
        "server":server_id,
        "messageid": id,
        "commands":[
          {"messageId":id, "reaction":Reaction, "roleId":myRole, "roletree": role_name},
        ],
        "party":
          [party]
      };
    }
        else{
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
        
    console.log(rrcommands)
  db.set(server_id, rrcommands);
});

      
    });
  }
}