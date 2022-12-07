const Database = require("@replit/database");
const db = new Database();
module.exports = {
  remove_role_react: function(reaction, user, client){
    reactionName = reaction._emoji.name;
    msgId = reaction.message.id;
    serverId = reaction.message.guildId;
    db.get(serverId).then(value => {
      value_check = null;
      value_check = value;
      if (value_check == null){
        return;
      }
      objectvalue = Object.values(value.commands);
      result = objectvalue.find(reaction => reaction.reaction == reactionName);
      try {
        reactionName = result.reaction;
        reactionMessageId = result.messageId;
        reactionRoleId = result.roleId;
        role_tree = result.roletree;
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
        console.log(result);
      }
    })
  }
}