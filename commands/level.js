const discord = require("discord.js");
const levelFile = require("../data/levels.json")
module.exports.run = async(bot, message, arguments) => {

    var idUser = message.author.id;

    if (!levelFile[idUser]) {

        levelFile[idUser] = {

            xp: 0,
            level: 1

        }

    }

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;
    var Level = levelFile[idUser].level
    var user = message.author.username
    var userIcon = message.author.defaultAvatarURL

    var whenNextLevel = nextLevelXp - xpUser

    var embedLevel = new discord.RichEmbed()
    .setDescription(`**${user}**`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("03adfc")
    .addField("level:", Level, true)
    .addField("XP",`${xpUser}*** / ***${nextLevelXp}`, true)
    .setFooter(`${whenNextLevel} XP left`)
    
    message.channel.send(embedLevel);


}

module.exports.help = {
    name: "level"
}