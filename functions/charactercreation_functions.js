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

function rollForStat(interaction) {
  // Create an array to store the dice rolls
  const rolls = [];
  let sum
  let roll
  if (interaction.options.getSubcommand() === 'official_random_abilities') {
    // Roll the dice 4 times
    for (let i = 0; i < 4; i++) {
      roll = Math.floor(Math.random() * 6) + 1;
      while (roll === 1) {
        roll = Math.floor(Math.random() * 6) + 1;
      }
      rolls.push(roll);
    }
    // Sort the rolls in ascending order
    rolls.sort((a, b) => a - b);

    // Drop the lowest roll
    rolls.shift();

    // Add the remaining rolls together
    sum = rolls.reduce((total, roll) => total + roll, 0);
  }
  else {
    sum = Math.floor(Math.random() * 20 + 1)
  }


  sumRolls = String(rolls);
  sumRolls = sumRolls.replaceAll(",", " + ");
  sumRolls = "(" + sumRolls + ")";

  rollsarray = {
    allrolls: sumRolls,
    total: sum
  }
  console.log(rollsarray)
  // Return the sum
  return rollsarray
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

  race = races[Math.floor(Math.random() * races.length)];
  characterClass = classes[Math.floor(Math.random() * classes.length)];
  strength = rollForStat(interaction);
  dexterity = rollForStat(interaction);
  constitution = rollForStat(interaction);
  intelligence = rollForStat(interaction);
  wisdom = rollForStat(interaction);
  charisma = rollForStat(interaction);
  //}
  var subclasses = "";

  switch (characterClass) {
    case "Fighter":
      subclasses = [
        "Arcane Archer", "Banneret", "Battle Master", "Cavalier", "Champion", "Echo Knight",
        "Eldritch Knight", "Psi Warrior", "Rune Knight", "Samurai"
      ];
      break;
    case "Cleric":
      subclasses = ["Arcana", "Death", "Forge", "Grave", "Knowledge", "Life", "Light", "Nature",
        "Order", "Peace", "Tempest", "Trickery", "Twilight", "War", "Solidarity", "Strength",
        "Ambition", "Zeal", "Fate"
      ];
      break;
    case "Wizard":
      subclasses = [
      "Arcana", "Death", "Forge", "Grave", "Knowledge", "Life", "Light", "Nature", 
      "Order", "Peace", "Tempest", "Trickery", "Twilight"
    ];
      break;
      case "Rogue":
        subclasses = ["Arcane Trickster", "Assassin", "Inquisitive", "Mastermind", 
        "Phantom", "Scout", "Soulknife", "Swashbuckler", "Thief"
      ];
      break;
      case "Barbarian":
        subclasses = [
          "Ancestral Guardian", "Battlerager", "Beast", "Berserker", "Giant", 
          "Storm Herald", "Totem Warrior", "Wild Magic", "Zealot"
        ]
      break;
      case "Bard":
        subclasses = ["Creation", "Eloquence", "Glamour", "Lore", "Spirits", "Swords", 
        "Valor", "Whispers"
      ];
      break;
      case "Druid":
        subclasses = ["Dreams", "Land", "Moon", "Shepherd", "Spores", "Stars", "Wildfire"];
      break;
      case "Monk":
        subclasses = ["Astral Self", "Ascendant Dragon", "Drunken Master", "Four Elements", 
        "Kensei", "Long Death", "Mercy", "Open Hand", "Shadow", "Sun Soul"
      ];
      break;
      case "Paladin":
        subclasses =  ["Ancients", "Conquest", "Crown", "Devotion", "Glory", "Redemption", 
        "Vengeance", "Watchers", "Oathbreaker"
      ];
      break;
      case "Ranger":
        subclasses = ["Beast Master", "Fey Wanderer", "Gloom Stalker", "Horizon Walker", 
        "Hunter", "Monster Slayer", "Swarmkeeper", "Drakewarden"
      ];
      break;
      case "Sorcerer":
      subclasses = ["Aberrant Mind", "Clockwork Soul", "Draconic Bloodline", "Divine Soul", 
      "Lunar Sorcery", "Shadow Magic", "Storm Sorcery", "Wild Magic", "Lunar Magic"
      ];
      break;
      case "Warlock":
      subclasses = ["Archfey", "Celestial", "Fathomless", "Fiend", "Genie", "Great Old One", 
      "Hexblade", "Undead", "Undying", "Mage of Lorehold", "Mage of Silverquill", "Mage of Witherbloom"
      ];
      break;
      case "Wizard":
      subclasses = ["Abjuration", "Bladesinging", "Chronurgy", "Conjuration", "Divination", "Enchantment", 
      "Evocation", "Graviturgy", "Illusion", "Necromancy", "Order of Scribes", "Transmutation", "War Magic", "Runecrafter"
      ];
      break;
      case "Artificer":
      subclasses = ["Alchemist", "Armorer", "Artillerist", "Battle Smith"];
      break;
      case "Blood Hunter":
      subclasses = ["Ghostslayer", "Lycan", "Mutant", "Profane Soul"];
      break;
  }
subclass = subclasses[Math.floor(Math.random() * classes.length)];

  if (interaction.options.getSubcommand() === 'official_random_abilities') {
      strength = strength.allrolls + "\n" + strength.total,
      dexterity = dexterity.allrolls + "\n" + dexterity.total,
      constitution = constitution.allrolls + "\n" + constitution.total,
      intelligence = intelligence.allrolls + "\n" + intelligence.total,
      wisdom = wisdom.allrolls + "\n" + wisdom.total,
      charisma = charisma.allrolls + "\n" + charisma.total
  }
  else {
    strength = strength.total;
    dexterity = dexterity.total;
    constitution = constitution.total;
    intelligence = intelligence.total;
    wisdom = wisdom.total;
    charisma = charisma.total;
  }

  const character = {
    race: race,
    class: characterClass,
    subclass: subclass,
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
  randomCharacter: function random_character(interaction) {
    const randomCharacter = generateRandomCharacter(interaction);
    const race = randomCharacter.race
    const races = require('.././images/dnd-races.json');
    raceImageUrl = races[race];
    const characterEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Random character")
      .addFields(
        { name: 'Race', value: randomCharacter.race, inline: true },
        { name: 'Class', value: randomCharacter.class, inline: true },
        { name: 'Subclass', value: randomCharacter.subclass, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Charisma', value: String(randomCharacter.abilities.charisma), inline: true },
        { name: 'Constitution', value: String(randomCharacter.abilities.constitution), inline: true },
        { name: 'Dexterity', value: String(randomCharacter.abilities.dexterity), inline: true },
        { name: 'Intelligence', value: String(randomCharacter.abilities.intelligence), inline: true },
        { name: 'Strength', value: String(randomCharacter.abilities.strength), inline: true },
        { name: 'Wisdom', value: String(randomCharacter.abilities.wisdom), inline: true },
      )
      .setImage(raceImageUrl)
    return interaction.reply({ content: "Here is your brand new character:", embeds: [characterEmbed] });
  }
}