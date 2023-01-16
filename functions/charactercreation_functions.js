const {
  EmbedBuilder,
} = require('discord.js');
const races = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf",
"Half-Orc", "Tiefling", "Aarakocra", "Aasimar", "Leonin", "Satyr", "Owlin", "Genasi", "Bugbear",
"Centaur", "Changeling", "Deep Gnome", "Duergar", "Eladrin", "Fairy", "Firbolg",
"Githyanki", "Githzerai", "Goblin", "Goliath", "Harengon", "Hobgoblin", "Kenku",
"Kobold", "Lizardfolk", "Minotaur", "Orc", "Sea Elf", "Shadar-kai", "Shifter", "Tabaxi",
"Tortle", "Triton", "Yuan-ti", "Kalashtar", "Warforged", "Autognome", "Giff", "Hadozee",
"Plasmoid", "Thri-kreen", "Loxodon", "Simic Hybrid", "Vedalken",
"Verdan", "Locathah", "Kender", "Grung"];
const classes = ["Fighter", "Cleric", "Wizard", "Rogue", "Barbarian", "Bard", "Druid", "Monk", "Paladin",
"Ranger", "Sorcerer", "Warlock", "Wizard", "Artificer", "Blood Hunter"];

function rollForStat(){
  // Create an array to store the dice rolls
  const rolls = [];

  // Roll the dice 4 times
  for (let i = 0; i < 4; i++) {
    // Generate a random number between 1 and 6
    const roll = Math.floor(Math.random() * 6) + 1;
    // Add the roll to the array
    rolls.push(roll);
  }

  // Sort the rolls in ascending order
  rolls.sort((a, b) => a - b);

  // Drop the lowest roll
  rolls.shift();

  // Add the remaining rolls together
  const sum = rolls.reduce((total, roll) => total + roll, 0);

  // Return the sum
  return sum
}

function generateRandomCharacter(interaction) {
    let race;
    let characterClass;
    let strength;
    let dexterity;
    let constitution;
    let intelligence;
    let wisdom;
    let charisma;
  if (interaction.options.getSubcommand() === 'complete_random_abilites'){
    console.log("complete random")
     race = races[Math.floor(Math.random() * races.length)];
     characterClass = classes[Math.floor(Math.random() * classes.length)];
     strength = Math.floor(Math.random() * 20 + 1);
     dexterity = Math.floor(Math.random() * 20 + 1);
     constitution = Math.floor(Math.random() * 20 + 1);
     intelligence = Math.floor(Math.random() * 20 + 1);
     wisdom = Math.floor(Math.random() * 20 + 1);
     charisma = Math.floor(Math.random() * 20 + 1);
  }
  else{
    console.log("official random")
    // Generate random values for the character's attributes
     race = races[Math.floor(Math.random() * races.length)];
     characterClass = classes[Math.floor(Math.random() * classes.length)];
     strength = rollForStat();
     dexterity = rollForStat();
     constitution = rollForStat();
     intelligence = rollForStat();
     wisdom = rollForStat();
     charisma = rollForStat();
  }
  
    

    // Create a new character object with the random values
    const character = {
        race: race,
        class: characterClass,
        abilities: {
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma
        }
    };

    return character;
}

module.exports = {
  randomCharacter: function random_character(interaction){
    const randomCharacter = generateRandomCharacter(interaction);
    const race = randomCharacter.race
    const races  = require('.././images/dnd-races.json');
    raceImageUrl = races[race];
    const characterEmbed = new EmbedBuilder()
              .setColor("Red")
              .setTitle("Random character")
              .addFields(
                  { name: 'Race', value: randomCharacter.race, inline: true},
                  { name: 'Class', value: randomCharacter.class, inline: true},
                  { name: '\u200B', value: '\u200B' },
                  { name: 'Charisma', value: String(randomCharacter.abilities.charisma), inline: true},
                  { name: 'Constitution', value: String(randomCharacter.abilities.constitution), inline: true},
                  { name: 'Dexterity', value: String(randomCharacter.abilities.dexterity), inline: true},
                  { name: 'Intelligence', value: String(randomCharacter.abilities.intelligence), inline: true},
                  { name: 'Strength', value: String(randomCharacter.abilities.strength), inline: true},
                  { name: 'Wisdom', value: String(randomCharacter.abilities.wisdom), inline: true},
              )
              .setImage(raceImageUrl)
    return interaction.reply({content: "Here is your brand new character:", embeds: [characterEmbed] });
  }
}