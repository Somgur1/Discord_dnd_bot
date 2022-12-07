const Database = require("@replit/database");
const db = new Database();
module.exports = {
  add_role_react: function(reaction, user, client){
    reactionName = reaction._emoji.name;
    msgId = reaction.message.id;
    server_id = reaction.message.guildId;
    db.get(server_id).then(value => {
      value_check = null;
      value_check = value;
      if (value_check == null){
        return
      }
      objectvalue = Object.values(value.commands);
      result = objectvalue.filter(playlist => playlist.reaction == reactionName);

      try{
        var guild = client.guilds.cache.get(server_id);
        role_tree = result[0].roletree;
        role_name = role_tree.name;
        role_check = guild.roles.cache.find((r) => r.name === role_name);
        if(!role_check.editable) return;
      }
      catch{

      }
      try {
        reactionName = result[0].reaction;
        reactionMessageId = result[0].messageId;
        reactionRoleId = result[0].roleId;
        if (reactionMessageId == msgId ){
          reaction.message.guild.members.cache.get(user.id).roles.add(reactionRoleId);
        }
      }
      catch (error) {
        console.log(error);
      }
    })
  }
}