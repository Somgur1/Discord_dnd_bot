const Database = require("@replit/database");
const db = new Database();

module.exports = {
  party_create: function(interaction){
      const party_name = interaction.options.getString('partyname');
    const server_id = interaction.guildId;
    // console.log(interaction);
    
db.get(server_id).then(value => {
    DB_check = null;
  DB_check = value;
  
  if (DB_check == null){
    partyJSON = {
        "party":[
          {"partyname":party_name, "partymembers":{}},
        ]
      };
  db.set(server_id, partyJSON);
  }
  else{
    rrstuff = value.commands;
    RRJSON = {
      "rrsettings" : {
        rrstuff
        }
    }
      baseJson = {
         "server":server_id,
          "commands":[],
      }
    
    partyJSON = {
         "party_name":party_name,
          "party_member":[],
      };
     rrcommands = {
        "server":"serverid",
        "messageid": "messageid",
        "commands":[
          {"messageId":"messageid", "reaction":"reaction", "roleId":"myRole", "roletree": "role_name"},
        ]
      };
    val = value
    // console.log("baseJSON1:")
    console.log(value);
    
    value.party.push(partyJSON)
    console.log(value);
    console.log("value.party")
    console.log(value.party)

  }
});
    
interaction.reply(`Set party name to: "${party_name}".`);
  },
  add_member: function(interaction){

  }
}