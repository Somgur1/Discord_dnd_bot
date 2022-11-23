const Database = require("@replit/database");
const db = new Database();

module.exports = {
  rradd: function(message_split, msg, server_id, SomgurId){
    if(msg.author.id != SomgurId){
      if (msg.member.roles.cache.some(role => role.name !== 'DM')) {
        return msg.reply("You cant make this command")
      }
    }
    RoleName = message_split[1]
    Reaction = message_split[2]
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
    db.get(server_id).then(value => {
      value_check = null;
  value_check = value;
  if (value_check == null){
    return console.log("Use the command '!rrcreate' first")
  }
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
      db.set(server_id, value);  
    })
    .catch(error => {
      console.log(error)
    })
  }
}