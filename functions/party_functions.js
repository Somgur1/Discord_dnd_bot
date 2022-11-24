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
    try{
      party = value.party
    }
    catch (error) {
  party = "";
}

    try{
      rrmessage_id = value.messageid;
      commands = value.commands;
      rrserver_id = value.server; 
    }
    catch (error) {
    rrmessage_id = "";
    commands = "";
    rrserver_id = "";
}
    
    
     rrcommands = {
        "server": rrserver_id,
        "messageid": rrmessage_id,
        commands
      };
    val = value
    // console.log("baseJSON1:")
    console.log("rrcommands:")
    console.log(rrcommands);
  

  }
});
    
interaction.reply(`Set party name to: "${party_name}".`);
  },
  add_member: function(interaction){

  }
}